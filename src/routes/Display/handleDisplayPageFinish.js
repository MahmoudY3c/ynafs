import request from "../../API/api";

export const renderHandleDisplayPageFinish = ({ setOpenModal, showError, setQuestions, hideModal }) => {

  const handleDisplayPageFinish = (values) => {
    let arr = []
    // extract the subject id from the subject
    if (values.subject) {
      arr = values.subject.split('@@');
      values.subject = arr[arr.length - 1]
    }

    let path = '/categories';
    if (arr[0] && values.level) {
      path = '/subjects/data';
    }

    setOpenModal(true);

    request(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(values)
    })
      .then(json => {
        // form.setFieldValue('drivePowerPoint', '');
        if (json.err) {
          return showError(json.err);
        }


        let questionsData = [];
        for (let js of json) {
          if (js.Lessons) {
            let data = js.Lessons
              .map(e => e.LessonId.Trees
                .map(tree => tree.treeId.Questions
                  .map(q => q.QuestionId)
                )
              ).flat(2);
            questionsData = questionsData.concat(data);
          } else if (js.Trees) {
            let data = js.Trees
              .map(tree => tree.treeId.Questions
                .map(q => q.QuestionId)
              ).flat(1);
            questionsData = questionsData.concat(data);
          }
        }

        setQuestions(questionsData);

        // setQuestions(json)
        hideModal(json.err);
      }).catch(err => {
        showError(err);
        hideModal(err);
      })

  }

  return handleDisplayPageFinish;
}