import { uniqueId } from "@tldraw/tldraw";
import request from "../../API/api";
// import store from "../../Redux/app/store";
import { updateSelectedTreeData } from "../../Redux/features/items/slice";
import { htmlSnapShot, uploadData } from "../../handlers/handlers";

export const renderHandleMainFormFinish = ({ handleTrueOrFalse, handleMultiple, setOpenModal, dispatch, setDrivePowerPoint, lessonsData, setAlert, treesData, selectedSubject }) => {

  const handleMainFormFinish = async (values) => {
    // show loading modal before start proccessing
    setOpenModal(true);

    if (values.image) values.image = values.image.filename;

    //processing the data
    let choices = [];
    if (values.QuestionTypeValue === "true-or-false") {
      const trueOrFalse = handleTrueOrFalse(values);
      values = trueOrFalse.values;
      choices = choices.concat(trueOrFalse.choices);
    } else if (values.QuestionTypeValue === 'multiple') {
      let multpleChoices = Object.keys(values).filter(e => e.match(/multiple\d+/))
      multpleChoices.forEach((choice, i) => {
        const multiple = handleMultiple(choice, values, i);
        values = multiple.values;
        choices = choices.concat(multiple.choices);
        delete values[choice]
      })
    }

    if (values?.question?.constructor === Array) {
      values.mathQuestion = values.question;
      delete values.question;
      if (values.essayAnswer) {
        values.mathEssayAnswer = values.essayAnswer;
      } else {
        values.mathChoices = choices.length ? choices : null;
      }

      // capture screenshot to the math question
      const { url, canvas, file } = await htmlSnapShot('#question-editor');
      const filename = await uploadData({ file: file, uid: `${uniqueId()}-${Date.now()}` });

      values.image = filename;
      console.log(file, filename)
      // const buffer = new TextEncoder().encode(document.querySelector('#question-editor').outerHTML);
      // downloadByteArray({ byte: buffer, name: 'file', type: 'text/html', ext: 'html' })
      // document.body.appendChild(canvas)
      // downloadBase64({ base64: url, ext: 'png', name: 'image' })
      console.log(url, canvas)
    } else {
      values.choices = choices.length ? choices : null;
    }

    // if (values.powerpoint) values.powerpoint = values.powerpoint.filename
    let arr = []
    // extract the subject id fron the subject
    if (values.subject) {
      arr = values.subject.split('@@');
      values.subject = arr[arr.length - 1]
    }


    // return console.log(values, '............... values ................')

    request('/questions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(values)
    })
      .then(json => {

        if (values.LessonPrepare || values.LessonVocabulary) {
          const targetTree = treesData.find(e => e._id === values.tree);
          const treeIndex = treesData.indexOf(targetTree);

          dispatch(
            updateSelectedTreeData({
              treeIndex,
              LessonPrepare: values.LessonPrepare,
              LessonVocabulary: values.LessonVocabulary,
            })
          )
        }


        if (values.drivePowerPoint && selectedSubject && values.level) {
          setDrivePowerPoint({
            drivePowerPoint: values.drivePowerPoint,
            level: values.level,
            subject: selectedSubject,
          })
        }

        if (json.err) setAlert({
          display: "flex",
          type: "error",
          message: json.err.message ? json.err.message : "حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى"
        });

        else if (json.success) setAlert({ display: "flex", type: "success", message: "تم الحفظ بنجاح" })

        setTimeout(() => {
          setOpenModal(false)
          if (!json.err) setAlert({ display: "none" });
        }, 2000)
      })

  }

  return handleMainFormFinish;
}