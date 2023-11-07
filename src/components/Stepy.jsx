import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { setCategories, setError, setItemsActions, setLessons, setLoading } from '../Redux/features/items/slice';
import { filterResponseData } from '../handlers/handlers';
import Choose from './Choose';
import { terms } from '../JSON';
import { renderHandleDisplayComponent } from '../global/events/handleDisplayComponent';

function Stepy(props) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { items: componentsState, loading, error, categories, lessonsData } = useSelector(state => state.items);
  const handleDisplayComponent = renderHandleDisplayComponent({ componentsState, form: props.form, dispatch });

  useFetch({
    url: `/categories?termCode=${componentsState.termValue}`,
    dependancy: [componentsState.termValue],
    options: {
      condition: componentsState.termValue,
      beforeStart: () => dispatch(setLoading({ status: true, item: 'categories' })),
      afterend: () => dispatch(setLoading({ status: false, item: 'categories' })),
    },
    callback({ data, error }) {

      if (error) {
        return dispatch(setError({
          error,
          area: 'categories'
        }))
      }

      dispatch(setCategories(data))
    },
  });


  useFetch({
    url: `/lessons?category=${componentsState.categoryValue}&termCode=${componentsState.termValue}`,
    dependancy: [componentsState.categoryValue, componentsState.termValue],
    options: {
      condition: componentsState.categoryValue && componentsState.termValue,
      beforeStart: () => dispatch(setLoading({ status: true, item: 'lessons' })),
      afterend: () => dispatch(setLoading({ status: false, item: 'lessons' })),
    },
    callback({ data, error }) {

      if (error) {
        return dispatch(setError({
          error,
          area: 'lessons'
        }))
      }

      dispatch(setLessons(filterResponseData(data)))
    },
  });

  return (
    <>
      <Choose
        data={terms}
        value={componentsState.termValue || ''}
        items={{ item: "title", value: "value" }}
        title={'اختر الفصل الدراسي'}
        // mode='multiple'
        name="termCode"
        onChange={(value) => handleDisplayComponent(value, setItemsActions.setItems, 'termValue', [
          'category',
          'categoryValue',
          'treeValue',
          'levelValue',
          'subjectValue',
          'lessonValue',
          'lessonValue',
          'trueOrFalse',
          'multiple',
          'essay',
          'QuestionTypeValue',
          'drivePowerPointValue',
        ])}
      />


      {componentsState.termValue && <Choose
        data={categories}
        value={componentsState.categoryValue || ''}
        items={{ item: "category", value: "_id" }}
        title='اختر القسم'
        loading={loading.item === 'categories' ? loading.status : null}
        // loading={categoriesLoader}
        // mode='multiple'
        name="category"
        onChange={(value) => handleDisplayComponent(value, setItemsActions.setItems, 'categoryValue', [
          'treeValue',
          'levelValue',
          'subjectValue',
          'lessonValue',
          'lessonValue',
          'trueOrFalse',
          'multiple',
          'essay',
          'QuestionTypeValue',
          'drivePowerPointValue',
        ])}
      />
      }

      {
        componentsState.categoryValue &&
        <Choose
          name="level"
          data={lessonsData}
          loading={loading.item === 'lessons' ? loading.status : null}
          // loading={loading}
          value={componentsState.levelValue || ''}
          title='اختر المرحلة'
          onChange={(value) => handleDisplayComponent(value, setItemsActions.setItems, 'levelValue', [
            'subjectValue',
            // 'levelValue',
            'treeValue',
            'lessonValue',
            'trueOrFalse',
            'multiple',
            'essay',
            'QuestionTypeValue',
            'drivePowerPointValue',
          ])}
        />
      }
      {
        componentsState.levelValue &&
        <Choose
          name="subject"
          items={{ value: "subjectId" }}
          data={lessonsData[componentsState.levelValue]}
          value={componentsState.subjectValue || ''}
          title='اختر المادة الدراسية'
          onChange={(value) => handleDisplayComponent(value, setItemsActions.setItems, 'subjectValue', [
            'lessonValue',
            'treeValue',
            'trueOrFalse',
            'multiple',
            'essay',
            'QuestionTypeValue',
            'drivePowerPointValue',
          ])}
        />
      }
    </>
  );
}

export default Stepy;
