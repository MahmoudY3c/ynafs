export const handleHideModal = ({ setAlert, setOpenModal }) => {
  const hideModal = err => {
    setTimeout(() => {
      setOpenModal(false)
      if (!err) setAlert({ display: false });
    }, 2000)
  }

  return hideModal;
}