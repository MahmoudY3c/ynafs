export const handleShowError = ({ setAlert, hideModal }) => {
  const showError = err => {
    if (err) {
      setAlert({
        display: true,
        type: "error",
        message: err.message ? err.message : "حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى"
      });
    }

    hideModal(err)
  }

  return showError;
}