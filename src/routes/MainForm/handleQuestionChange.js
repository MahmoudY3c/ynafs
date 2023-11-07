export const renderHandleQuestionsChange = ({ dispatch, form, setItems, componentsState, questionTypes }) => {
  const handleQuestionChange = value => {
    //remove any uploaded image on change
    form.setFieldsValue({ "image": undefined });
    dispatch(setItems({ ...componentsState, displayQestionFeld: true }));

    if (value.includes(questionTypes[0].value)) {
      dispatch(
        setItems({
          ...componentsState,
          trueOrFalse: true,
          multiple: false,
          essay: false,
        })
      );
    } else if (value.includes(questionTypes[1].value)) {
      dispatch(
        setItems({
          ...componentsState,
          trueOrFalse: false,
          multiple: true,
          essay: false,
        })
      );
    } else if (value.includes(questionTypes[2].value)) {
      dispatch(
        setItems({
          ...componentsState,
          trueOrFalse: false,
          multiple: false,
          essay: true,
        })
      );
    } else {
      dispatch(
        setItems({
          ...componentsState,
          trueOrFalse: false,
          multiple: false,
          essay: false,
        })
      );
    }
    console.log(`'%c selected ${value}`, `color: green;`, `Length: ${value.length}`);
  }

  return handleQuestionChange;
}