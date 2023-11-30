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
      if (useForSubjects && drivePowerPoint) continue;

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
  console.log('====================================');
  console.log(choice);
  console.log('====================================');
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

// scale 5 for high quality 
export const htmlSnapShot = (selector, options = { backgroundColor: '#fff', quality: 1, scale: 5 }) => {
  const node = document.querySelector(selector)
  //.cloneNode(true);

  // node.style.height = 'auto';
  // node.style.width = 600 + 'px';

  // document.querySelector('#root').append(node);
  return window.htmlToImage.toCanvas(node, options)
    .then(function (canvas) {
      // node.remove()
      const url = canvas.toDataURL();
      return { url, canvas }
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
      return { error }
    });
}

export const downloadBase64 = ({ name = 'file', ext = 'png', base64 }) => {
  let link = Object.assign(document.createElement('a'), {
    href: base64,
    //add the file extension at the end of the file name to avoid download attribute conflict between the real file type and file name for example if the file name contains (.com) it's will use it as the file extention so use the file extension eveytime
    download: name + '.' + ext
  });

  link.click();
  link.remove();
  return link
}

//a function to download arrayBuffer to user device
export const downloadByteArray = ({ byte, name, ext, type }) => {
  let link = Object.assign(document.createElement('a'), {
    href: "data:" + type + ";base64," + arrayBufferToBase64(byte),
    //add the file extension at the end of the file name to avoid download attribute conflict between the real file type and file name for example if the file name contains (.com) it's will use it as the file extention so use the file extension eveytime
    download: name + '.' + ext
  });

  // link.addEventListener('click', function (e) {
  //   e.preventDefault();
  //   window.open(this.getAttribute('href'))
  // });

  link.click();
  link.remove();
  return link
}

export const latexToSvg = function (formula) {
  let wrapper = window.MathJax.tex2svg(`${formula}`, { em: 10, ex: 5, display: true })
  let svg = wrapper.getElementsByTagName("svg")[0];
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  return {
    buffer: new TextEncoder().encode(svg.outerHTML),
    svg,
  };
}

export const latexToMathml = (formula) => {
  const mathmlText = window.MathJax.tex2mml(`${formula}`, { display: true }).replace('display="block"', '');
  return {
    mathml: mathmlText,
  }
}
export function SvgToPng(svgArrayBuffer, download) {
  return new Promise((resolve, reject) => {
    const image = new Image(); // create <img> element
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = image.clientWidth;
      canvas.height = image.clientHeight;
      context.drawImage(image, 0, 0, image.clientWidth, image.clientHeight);
      const imgData = canvas.toDataURL('image/png');

      if (download) {
        downloadBase64({ name: "image", 'ext': 'png', base64: imgData })
      }

      resolve(imgData)
    }

    image.onerror = function (e) {
      reject(e);
    }

    // btoa — binary string to ASCII (Base64-encoded)
    // image.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    image.src = 'data:image/svg+xml;base64,' + arrayBufferToBase64(svgArrayBuffer);

    document.body.appendChild(image)
  })
}

//parse arrayBuffer as base64 str
export const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}




// that method causing error when take a screenshot by html to img that why i used mathjax as svg instead
export const renderByMathLive = (value, node, options) => {
  node.insertAdjacentHTML('beforeEnd', window.MathLive.convertLatexToMarkup(value));
  window.MathLive.renderMathInElement(node);
  return node;
}


export const renderByMathJax = (value, node, options) => {
  // const { svg } = latexToSvg(value);
  // node.insertAdjacentElement('beforeEnd', svg);
  const { mathml } = latexToMathml(value);
  node.insertAdjacentHTML('beforeEnd', mathml);
  return node
}


