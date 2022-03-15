
// fetchProgress('/upload').then(console.log)

function fetchProgress (url, opts = {}, onProgress) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (var key in opts.headers || {}) {
      xhr.setRequestHeader(key, opts.headers[key]);
    }

    xhr.onload = e => resolve(e.target.responseText)
    xhr.onerror = reject;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress; //上传
    }
    if ('onprogerss' in xhr && onProgress) {
      xhr.onprogress = onProgress; //下载
    }
    xhr.send(opts.body)
  })
}

module.exports = {
  fetchProgress,
}