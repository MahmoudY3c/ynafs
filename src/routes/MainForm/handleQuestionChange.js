export const renderHandleQuestionsChange = ({ dispatch, form, setItems, componentsState, questionTypes }) => {
  const handleQuestionChange = value => {
    //remove any uploaded image on change
    form.setFieldsValue({ "image": undefined });

    const payload = {
      ...componentsState,
      trueOrFalse: false,
      multiple: false,
      essay: false,
    };

    if (!componentsState.displayQestionFeld) {
      payload.displayQestionFeld = true
    }

    if (value.includes(questionTypes[0].value)) {
      dispatch(
        setItems({
          ...payload,
          trueOrFalse: true,
        })
      );
    } else if (value.includes(questionTypes[1].value)) {
      dispatch(
        setItems({
          ...payload,
          multiple: true,
        })
      );
    } else if (value.includes(questionTypes[2].value)) {
      dispatch(
        setItems({
          ...payload,
          essay: true,
        })
      );
    } else {
      dispatch(
        setItems(payload)
      );
    }
    console.log(`'%c selected ${value}`, `color: green;`, `Length: ${value.length}`);
  }

  return handleQuestionChange;
}