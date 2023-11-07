/* eslint-disable no-unused-vars */
function delTest(obj, callback) {
  for (let key of Object.keys(obj)) {
    if (callback(key)) {
      delete obj[key]
    }
  }
  return obj;
}

export function filterResponseData(data, useForSubjects) {
  const holder = {};
  let _continue = false;

  for (let i = 0; i < data.length; i++) {
    let e = data[i]
    const learningType = e.learningType;
    const level = e.level
    const level1 = e.level1;
    const subject = e.subject;
    const drivePowerPoint = e.drivePowerPoint;
    if (learningType === 'الثانوية مقررات') continue;

    let key = `${(learningType || '')}${learningType ? ' - ' : ''}${level1 || level || ''}` || subject;
    const isHighSchool = learningType === 'الثانوية مسارات' && (level === 'السنة الثانية' || level === 'السنة الثالثة');
    // if (learningType === 'الثانوية مسارات' && (level === 'السنة الثانية' || level === 'السنة الثالثة')) {
    //   key += ' - ' + subject;
    // }

    // if(!key) {
    //   key = subject;
    //   _continue = false
    // } else if(key) {
    //   _continue = true
    // }

    if (_continue) continue;

    if (!holder[key]) {
      holder[key] = {};
    }
    // console.log(holder[key][level1 ? isHighSchool ? level + ' - ' + subject : level : subject]?.['drivePowerPoint']);
    // e = delTest(e, key => key.startsWith('learningType') || key.startsWith('level') || key.startsWith('subject'));
    if (!holder[key][level1 ? isHighSchool ? level + ' - ' + subject : level : subject]) {
      // an option to remove subjects that already have a powerpoint file used for PowerPointPage
      if (useForSubjects && drivePowerPoint)  continue;

      holder[key][level1 ? isHighSchool ? level + ' - ' + subject : level : subject] = [e];

      if (!holder[key][level1 ? isHighSchool ? level + ' - ' + subject : level : subject]['drivePowerPoint']) {
        holder[key][level1 ? isHighSchool ? level + ' - ' + subject : level : subject]['drivePowerPoint'] = drivePowerPoint;
      }
    } else {
      holder[key][level1 ? isHighSchool ? level + ' - ' + subject : level : subject].push(e);
    }
  }

  return holder;

  // let holder = {};
  // for (let i = 0; i < data.length; i++) {
  //   let e = data[i]
  //   let learningType = e.learningType;
  //   const level = e.level ? ' - ' + e.level : '';

  //   if (!holder[learningType + level]) {
  //     holder[learningType + level] = []
  //   } else if (holder[learningType + level]) {
  //     e = delTest(e, key => ['learningType', 'level'].some(a => key.startsWith(a)))
  //     holder[learningType + level].push(e)
  //   }
  // }

  // // filter the holder to get subjects
  // for (let item of Object.keys(holder)) {
  //   let subjectsHolder = {};
  //   for (let sub of holder[item]) {
  //     const subject = sub.subject;
  //     sub = delTest(sub, key => ['subject'].some(a => key.startsWith(a)))
  //     if (!subjectsHolder[subject]) {
  //       subjectsHolder[subject] = [sub]
  //     } else if (subjectsHolder[subject]) {
  //       subjectsHolder[subject] = subjectsHolder[subject].concat([sub])
  //     }
  //   }
  //   holder[item] = subjectsHolder
  // }

  // return holder;
}

export function handleTrueOrFalse(values) {
  const choices = []
  if (values.answer === "true") {
    values.answer = 0
    choices.push({
      title: "صواب",
      isTrue: true
    })
    choices.push({
      title: "خطأ",
      isTrue: false
    })
  } else if (values.answer === "false") {
    values.answer = 0
    choices.push({
      title: "خطأ",
      isTrue: true
    })
    choices.push({
      title: "صواب",
      isTrue: false
    })
  }

  return { choices, values }
}

export function handleMultiple(choice, values, answerIndex) {
  const choices = [];
  if (choice === values.answer) {
    values.answer = answerIndex
    choices.push({
      title: values[choice],
      isTrue: true
    })
  } else {
    choices.push({
      title: values[choice],
      isTrue: false
    })
  }
  return { choices, values }
}

export function handleNewData(obj, container) {
  for (let i in obj) container.append(i, obj[i])
  return container
}
export const formData = (obj, fd) => handleNewData(obj, fd ? fd : new FormData())
export const createHeaders = (obj, h) => handleNewData(obj, h ? h : new Headers())