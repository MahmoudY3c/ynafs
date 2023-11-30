

export const checkCondition = (condition) => {
  return new Promise(resolve => {
    const checkCondition = () => {
      if (condition) {
        resolve('done!');
      } else {
        setTimeout(checkCondition, 100); // Check again after 100 milliseconds
      }
    };

    checkCondition();
  });
};

export const waitForKatex = () => {
  return new Promise(resolve => {
    const checkKatex = () => {
      if (typeof katex !== 'undefined') {
        resolve(window.katex);
      } else {
        setTimeout(checkKatex, 100); // Check again after 100 milliseconds
      }
    };

    checkKatex();
  });
};

export const uniqueId = () => String.fromCharCode(Math.floor((Math.random() * 25) + 65))
  + Math.floor(Math.random() * Date.now()).toString(20);

export const parser = txt => new DOMParser().parseFromString(txt, 'text/html');

// scale 5 for high quality
export const htmlSnapShot = (selector, options = { backgroundColor: '#fff', pixelRatio: 1, quality: 1, scale: 5 }) => {
  const node = document.querySelector(selector)
    .cloneNode(true);
  node.style.width = 600 + 'px';
  // node.style.opacity = 0;
  document.body.append(node);

  // console.log(toCanvas);
  return window.htmlToImage.toCanvas(node, options)
    .then(function (canvas) {
      node.remove()
      const url = canvas.toDataURL();
      // downloadBase64({ base64: url })
      // document.body.appendChild(canvas);

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
export const downloadByteArray = ({ name, ext, type, byte }) => {
  let link = Object.assign(document.createElement('a'), {
    href: "data:" + type + ";base64," + arrayBufferToBase64(byte),
    //add the file extension at the end of the file name to avoid download attribute conflict between the real file type and file name for example if the file name contains (.com) it's will use it as the file extention so use the file extension eveytime
    download: name + '.' + ext
  });

  link.addEventListener('click', function (e) {
    e.preventDefault();
    window.open(this.getAttribute('href'))
  });

  link.click();
  link.remove();
  return link
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


export function removeUnccessaryCharacters(latex) {
  // \boxed{...}, \text{...}
  const reversedList = ['displaystyle'];
  for (let item of reversedList) {
    if (latex.includes(`\\${item}`)) {
      const regex = new RegExp(`\\\\${item}`, 'gi');
      latex = latex.replace(regex, '')
    }
  }

  return latex;
}


export function getLatexMathml(equation = '\\displaystyle\\sum_{i=1}^5') {
  equation = removeUnccessaryCharacters(equation);
  // Convert MathML or LaTeX equation to SVG using KaTeX
  return waitForKatex()
    .then(katex => {
      const htmlString = katex.renderToString(equation, { displayMode: true, output: 'mathml' });
      return { htmlString, equation }
    })
}



export function handleEditorState(quill) {
  // getting and display saved user entered data drom localStorage
  const data = JSON.parse(localStorage.getItem('delta') || '[]');
  quill.setContents(data);
  const handleBeforeUnload = function (e) {
    localStorage.setItem('delta', JSON.stringify(quill.getContents()))
  };

  return handleBeforeUnload;
}



export const latexToImg = function (formula) {
  return new Promise((resolve, reject) => {
    let wrapper = window.MathJax.tex2svg(`${formula}`, { em: 10, ex: 5, display: true })
    let mjOut = wrapper.getElementsByTagName("svg")[0]
    document.body.appendChild(mjOut);
    mjOut.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    resolve({
      buffer: new TextEncoder().encode(mjOut.outerHTML),
      svg: mjOut,
    });
  })
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