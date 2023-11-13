import request from "../../API/api";

export const handlePowerPointFinish = ({ setAlert, setOpenModal, selectedSubject, form, setDrivePowerPoint }) => {
  const handleFinish = (values) => {
    let arr = []
    // extract the subject id from the subject
    if (values.subject) {
      arr = values.subject.split('@@');
      values.subject = arr[arr.length - 1]
    }

    if (!values.drivePowerPoint) {
      return setAlert({
        display: "flex",
        type: "error",
        message: "برجاء اضافة رابط"
      });
    }

    console.log(arr);

    setOpenModal(true);

    request('/subjects', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(values)
    })
      .then(json => {
        // if (values.drivePowerPoint && selectedSubject && values.level) {
        //   setDrivePowerPoint(prev => [...prev, {
        //     value: values.drivePowerPoint,
        //     level: values.level,
        //     subject: selectedSubject,
        //   }])
        // }
        if (values.drivePowerPoint && selectedSubject && values.level) {
          setDrivePowerPoint({
            drivePowerPoint: values.drivePowerPoint,
            level: values.level,
            subject: selectedSubject,
          })
        }

        form.setFieldValue('drivePowerPoint', '');

        if (json.err) setAlert({
          display: "flex",
          type: "error",
          message: json.err.message ? json.err.message : "حدث خطا اثناء حفظ الرابط برجاء المحاولة مره اخرى"
        });

        else if (json.success) setAlert({ display: "flex", type: "success", message: "تم الحفظ بنجاح" })

        setTimeout(() => {
          setOpenModal(false)
          if (!json.err) setAlert({ display: "none" });
        }, 2000)
      })

  }

  return handleFinish;
}