// a function to set a specific items value to null to handle show / hide them

export const renderHandleDisplayComponent = ({ componentsState, form, dispatch }) => {

  const handleDisplayComponent = (value, setState, prop, hide) => {
    console.log(value, value.length, 'levelValue');

    if (value.length) {
      const payload = {
        ...componentsState,
        [prop]: value
      }

      if (hide) {
        for (let g of hide) {
          payload[g] = null
          form.setFieldValue(g.replace('Value', ''), '');
          if (g === 'QuestionTypeValue') form.setFieldValue(g, '');
        }
      }

      dispatch(setState(payload));
    } else {
      const payload = { ...componentsState, [prop]: null }
      dispatch(setState(payload))
    }
  };

  return handleDisplayComponent;
}