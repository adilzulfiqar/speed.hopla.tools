let eStatus,
  speed_started,
  result_json,
  options,
  theadMaxTime,
  sum,
  avg,
  speed,
  fixed;
showScoreFunction();

document
  .getElementById('start-speedtest')
  .addEventListener('click', function() {
    if (speed_started) {
      console.log('Speedtest already running.');
      return;
    }
    const btn = document.querySelector('#start-speedtest');
    document.querySelector('#start-speedtest').textContent = 'Wait..';
    speed_started = true;
    document.querySelector('.up-spinner').style.display = 'block';
    document.querySelector('.ping-spinner').style.display = 'block';
    document.querySelector('.down-spinner').style.display = 'block';
    console.log('Start speed test clicked!');
    if (!btn.dataset.clicked) {
      console.log('first click');
    } else {
      console.log('button has been clicked before');
      document.querySelector('#down_value').textContent = '';
      document.querySelector('#up_value').textContent = '';
      document.querySelector('#ping_value').textContent = '';
    }
    btn.dataset.clicked = true;
    options = btn.dataset.options;
    eStatus = document.querySelector('#speed-status');
    setStatus('Speed test has been started. Please wait..');

    function onPing(speed) {
      document.querySelector('#ping_value').textContent = speed;
      document.querySelector('.ping-spinner').style.display = 'none';
    }
    function onDownload(speed) {
      document.querySelector('#down_value').textContent =
        Math.round(speed * 10) / 10;
      document.querySelector('.down-spinner').style.display = 'none';
    }
    function onUpload(speed) {
      document.querySelector('#up_value').textContent =
        Math.round(speed * 10) / 10;
      document.querySelector('.up-spinner').style.display = 'none';
    }
    getSpeedResults(onPing, onDownload, onUpload).then(result => {
      console.log('result', result);
      speed_started = false;

      setStatus(
        'Results: Ping=' +
          result.ping +
          ' DL=' +
          result.download +
          'Mbps   UL=' +
          result.upload +
          'Mbps'
      );
      result.download = Math.round(result.download * 10) / 10;
      result.upload = Math.round(result.upload * 10) / 10;

      let restext = '';
      if (!options) {
        restext = `${result.download}:${result.upload}:${result.ping}`;
      } else {
        if (options.indexOf('down') > -1) {
          restext += `Download Speed=[${result.download}] Mbps  `;
        }
        if (options.indexOf('up') > -1) {
          restext += `Upload Speed=[${result.upload}] Mbps  `;
        }
        if (options.indexOf('ping') > -1) {
          restext += `Ping=[${result.ping}]  `;
        }
        restext = restext.trim();
      }

      let score = getScore(result.download, result.upload, result.ping);
      result_json.score = score;
      printResult(result_json);

      document.querySelector('#start-speedtest').textContent = 'Start';
      try {
        let inputname = document.querySelector('.speedbox').dataset.nametarget;
        // $(`input[name="${inputname}"]`).val(restext);
        document.getElementsByName(inputname)[0].value = score;
        // window.top.postMessage({media_uploaded: true, target: inputname, url: restext}, '*')
        // window.top.postMessage({setvalue: true, name: inputname, value: score, speed_data: true, download: result.download, upload: result.upload, ping: result.ping}, '*')
        window.parent.postMessage(
          {
            setvalue: true,
            name: inputname,
            value: score,
            speed_data: true,
            download: result.download,
            upload: result.upload,
            ping: result.ping
          },
          '*'
        );
      } catch (e) {
        console.error('Failed to set value of speedtest input. ', e);
      }
    });
  });

function printResult(o) {
  const availableData = JSON.stringify(o, null, 2).replace(/\n/g, '<br>');
  document.querySelector(
    '#result_container'
  ).innerHTML = `<p>${availableData}</p>`;
}
function getSpeedResults(onPing, onDownload, onUpload) {
  const result = {};
  console.log('ping.');
  result_json = {};
  // return do_ping().then(() => {
  // return do_ping().then(() => {
  getCFinfo().then(d => {
    result_json.loc = d.loc;
    result_json.colo = d.colo;
    printResult(result_json);
  });
  return do_ping().then(ping => {
    result.ping = ping[0];
    result_json.lowest_ping = ping[0];
    result_json.average_ping = ping[2];
    result_json.jitter = ping[1];
    printResult(result_json);
    onPing(ping[0]);
    console.log('download.');
    return do_download().then(dspeed => {
      result.download = dspeed;
      result_json.download = Math.round(dspeed * 10) / 10;
      printResult(result_json);
      onDownload(dspeed);
      console.log('upload.');
      return do_upload().then(uspeed => {
        result.upload = uspeed;
        result_json.upload = Math.round(uspeed * 10) / 10;
        onUpload(uspeed);
        printResult(result_json);
        return result;
      });
    });
  });
  // });
  // });
  async function do_ping() {
    theadMaxTime = 5;
    const pings = [];

    return new Promise(async resolve => {
      for (let i = 1; i <= 12; i++) {
        // 1 TO 12 BECAUSE FIRST 2 IS ERROR PRONE.
        const iping = await _ping();
        if (i > 2) pings.push(iping); // IGNORE FIRST TWO PINGS.
      }
      console.log('pings', pings);
      result_json.pings = pings.toString();
      const lowestPing = Math.min(...pings);

      sum = pings.reduce(function(a, b) {
        return a + b;
      });
      avg = sum / pings.length;

      resolve([lowestPing, getJitter(), avg]);

      function getJitter() {
        let previousPing;
        let differences = [];
        let sum = 0;
        for (let i = 0; i < pings.length; i++) {
          if (previousPing) {
            const diff = Math.abs(pings[i] - previousPing);
            sum += diff;
            differences.push(diff);
          }
          previousPing = pings[i];
        }
        return Math.round((sum / differences.length) * 10) / 10;
      }
    });

    async function _ping() {
      return new Promise(resolve => {
        let startTime;
        const xhr = new XMLHttpRequest();
        xhr.open(
          'HEAD',
          'https://1.1.1.1/cdn-cgi/trace?a=' + new Date().getTime()
        );
        // xhr.open("HEAD", "https://widgets.hopla.tools/speedtest?a=" + (new Date()).getTime());
        // xhr.open("HEAD", "https://www.google.com?a=" + (new Date()).getTime());
        // xhr.open("HEAD", "https://widgets.hopla.tools");
        // xhr.open("HEAD", "http://8.8.8.8?a=" + (new Date()).getTime());
        xhr.timeout = theadMaxTime * 1000;
        xhr.onload = function() {
          if (xhr.statusCode === 302) {
            console.log(
              'Request redirected to ',
              xhr.getResponseHeader('Location')
            );
            return;
          }
          const ping = getNow() - startTime;
          resolve(ping);
          setTimeout(() => {
            resolve(ping);
          }, 10);
        };
        xhr.onerror = function() {
          resolve(getNow() - startTime);
        };
        xhr.ontimeout = function() {
          // if (discard) data = count;
          resolve(getNow() - startTime);
        };
        startTime = getNow();
        xhr.send();
      });
    }
  }

  async function do_download() {
    const todo = 1,
      concurrent = 2,
      maxTime = 10,
      theadMaxTime = 5;
    let started = 0,
      running = 0,
      done = 0,
      timeStart,
      totalBytes = 0,
      totalDiff = 0;
    let aBytesLoaded = [];
    let aTimeDiff = [];
    const speedTestDownloadCorrectionFactor = 1.135;

    return new Promise(resolve => {
      startThread_download();

      function testFinish(error, data, status) {
        if (error) {
          console.log('Something went wrong.', error);
          return;
        }
        // console.log("Final Download Speed:", data);
        resolve(data);
      }

      function downloadProgress(progress) {
        // console.log("Download Progress:", progress);
      }
      function downloadSpeedProgress(speed) {}

      function startThread_download() {
        if (started >= todo) return; //all are started
        if (running >= concurrent) return;
        running++;

        started++;
        timeStart = getNow();
        triggerCache().then(() => {
          downloadStart(timeStart, function(error, count) {
            if (error) return testFinish(error);

            let diff = getNow() - timeStart; // ms
            diff = diff / 1000; // seconds
            totalDiff += diff;

            running--;
            totalBytes += count;
            done++;
            speed = totalBytes / totalDiff;
            fixed = (speed * speedTestDownloadCorrectionFactor) / 125000;

            let timePct = (diff / maxTime) * 100;
            let amtPct = 0; //time-only

            if (totalDiff > maxTime) {
              done = todo;
            }
            if (done <= todo) {
              downloadProgress(
                Math.round(Math.min(Math.max(timePct, amtPct), 100.0) * 10) / 10
              );
              downloadSpeedProgress(fixed);
            }
            if (done >= todo) {
              testFinish(null, fixed); //bytes/sec
            } else {
              startThread_download();
            }
            startThread_download(); //Try another
          });
        });
      }

      async function triggerCache() {
        // let isCache = await testCache();
        // if (isCache == 'no') {
        //   isCache = await testCache();
        // }
        // return;
        // function testCache() {
        //   return fetch('https://speed.hopla.tools/speedtest?a=' + (new Date()).getTime()).then(response => {
        //     const isCache = response.headers.get('iscache');
        //     const txt = response.body;
        //     return isCache;
        //   });
        // }
        return new Promise(resolve => {
          let data = '',
            count = 0,
            last_index = 0;
          // const testFile = 'https://speed.hopla.tools/speedtest?file=' + started;
          const testFile = 'https://speed.hopla.tools/speedtest';
          const xhr = new XMLHttpRequest();
          xhr.open('GET', testFile + '&a=' + new Date().getTime());
          // xhr.timeout = 3 * 1000;
          xhr.onload = function() {
            console.log('loaded');
            if (xhr.statusCode === 302) {
              console.log(
                'Request redirected to ',
                xhr.getResponseHeader('Location')
              );
              return;
            }
            data = count;
            // callback(null, data, xhr.statusCode);
          };
          xhr.onreadystatechange = function() {
            if (this.readyState == this.HEADERS_RECEIVED) {
              var iscache = xhr.getResponseHeader('iscache');
              console.log('iscache', iscache);
              if (iscache == 'yes') {
                xhr.abort();
                resolve();
              } else {
                xhr.abort();
                return triggerCache();
              }
            }
          };
          // xhr.onerror = callback;
          xhr.onerror = function() {
            console.log('error');
            data = count;
            // callback(null, data);
          };
          xhr.ontimeout = function(xhr) {
            data = count;
            console.log('timeout', xhr.statusCode);
            console.log('xhr', xhr);
            // callback(null, data, xhr.statusCode);
          };
          xhr.send();
        });
      }
      function downloadStart(timeStart, callback) {
        aBytesLoaded.push(0);
        aTimeDiff.push(0);
        const storageIndex = aBytesLoaded.length - 1;

        let data = '',
          count = 0,
          last_index = 0;
        // const testFile = 'https://speed.hopla.tools/speedtest?file=' + started;
        const testFile = 'https://speed.hopla.tools/speedtest';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', testFile + '&a=' + new Date().getTime());
        xhr.timeout = theadMaxTime * 1000;
        xhr.onload = function() {
          if (xhr.statusCode === 302) {
            console.log(
              'Request redirected to ',
              xhr.getResponseHeader('Location')
            );
            return;
          }
          data = count;
          callback(null, data, xhr.statusCode);
        };
        // xhr.onerror = callback;
        xhr.onerror = function() {
          data = count;
          callback(null, data);
        };
        xhr.ontimeout = function() {
          data = count;
          callback(null, data, xhr.statusCode);
        };
        xhr.onprogress = function(oEvent) {
          count = oEvent.loaded;
          aBytesLoaded[storageIndex] = count;
          let overAllBytes = aBytesLoaded.reduce((a, b) => a + b, 0);
          document.querySelector('.down-spinner').style.display = 'none';

          let diff = (getNow() - timeStart) / 1000; // ms
          aTimeDiff[storageIndex] = diff;
          let overAllTimeDiff = aTimeDiff.reduce((a, b) => a + b, 0);
          speed = overAllBytes / overAllTimeDiff;
          fixed = (speed * speedTestDownloadCorrectionFactor) / 125000;
          fixed = Math.round(fixed * 10) / 10;
          document.querySelector('#down_value').textContent = fixed;
        };

        xhr.send();
      }
    });
  }

  async function do_upload() {
    const todo = 5,
      concurrent = 2,
      maxTime = 10,
      theadMaxTime = 5;
    let started = 0,
      running = 0,
      done = 0,
      timeStart,
      totalBytes = 0,
      totalDiff = 0;
    let aBytesLoaded = [];
    let aTimeDiff = [];
    const speedTestDownloadCorrectionFactor = 1.135;

    const myData = 'k'.repeat(10000000);
    // const myData = "k".repeat(10000);

    return new Promise(resolve => {
      startThread_upload();

      function testFinish(error, data, status) {
        if (error) {
          console.log('Something went wrong.', error);
          return;
        }
        // console.log("Final Download Speed:", data);
        resolve(data);
      }

      function uploadProgress(progress) {
        // console.log("Upload Progress:", progress);
      }
      function uploadSpeedProgress(speed) {
        // console.log("Speed:", speed);
      }

      function startThread_upload() {
        if (started >= todo) return; //all are started
        if (running >= concurrent) return;
        running++;

        started++;
        timeStart = getNow();

        uploadStart(timeStart, function(error, count) {
          if (error) return testFinish(error);

          let diff = getNow() - timeStart; // ms
          diff = diff / 1000; // seconds
          totalDiff += diff;

          running--;
          totalBytes += count;
          done++;
          speed = totalBytes / totalDiff;
          fixed = (speed * speedTestDownloadCorrectionFactor) / 125000;
          let timePct = (diff / maxTime) * 100;
          let amtPct = 0; //time-only

          if (totalDiff > maxTime) {
            done = todo;
          }
          if (done <= todo) {
            uploadProgress(
              Math.round(Math.min(Math.max(timePct, amtPct), 100.0) * 10) / 10
            );
            uploadSpeedProgress(fixed);
          }
          if (done >= todo) {
            testFinish(null, fixed); //bytes/sec
          } else {
            startThread_upload();
          }
        });
      }

      function uploadStart(timeStart, callback) {
        aBytesLoaded.push(0);
        aTimeDiff.push(0);
        const storageIndex = aBytesLoaded.length - 1;

        let bytesLoaded = 0;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://speed.hopla.tools/upload', true);
        // xhr.open('POST', 'https://speedtest.silvercloud.workers.dev/', true);
        xhr.timeout = 5000;
        xhr.onload = function(e) {
          // console.log("Upload finished!", e.target.responseText);
          callback(null, myData.length);
        };
        xhr.ontimeout = function() {
          // callback(null, myData.length);
          // console.log("Timeout. Bytes loaded", bytesLoaded);
          callback(null, bytesLoaded);
        };
        xhr.onerror = function(e) {
          console.log('upload error', e);
          console.log('bytesLoaded', bytesLoaded);
          callback(null, bytesLoaded);
        };

        xhr.upload.onprogress = function(e) {
          bytesLoaded = e.loaded;
          aBytesLoaded[storageIndex] = bytesLoaded;
          let overAllBytes = aBytesLoaded.reduce((a, b) => a + b, 0);
          document.querySelector('.up-spinner').style.display = 'none';

          let diff = (getNow() - timeStart) / 1000; // ms
          aTimeDiff[storageIndex] = diff;
          let overAllTimeDiff = aTimeDiff.reduce((a, b) => a + b, 0);
          speed = overAllBytes / overAllTimeDiff;
          fixed = (speed * speedTestDownloadCorrectionFactor) / 125000;
          fixed = Math.round(fixed * 10) / 10;
          document.querySelector('#up_value').textContent = fixed;
        };

        xhr.send(myData);
      }
      function uploadStart_buggy(callback) {
        const http = new XMLHttpRequest();
        http.open('POST', 'https://speed.hopla.tools/upload', true);
        // http.open("POST", 'https://speedtest.silvercloud.workers.dev/', true);
        http.timeout = 5000;
        http.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded'
        );
        http.ontimeout = function() {
          callback(null, myData.length);
        };

        http.onreadystatechange = function() {
          if (http.readyState == 4 && http.status == 200) {
            callback(null, myData.length);
          }
        };
        http.send(myData);
      }
    });
  }

  async function getCFinfo() {
    return fetch('https://1.1.1.1/cdn-cgi/trace')
      .then(response => response.text())
      .then(data => {
        const ret = {
          loc: '',
          colo: ''
        };
        let match = data.match(/colo=(.+)/);
        if (match && match.length > 1) {
          ret.colo = match[1];
        }
        match = data.match(/loc=(.+)/);
        if (match && match.length > 1) {
          ret.loc = match[1];
        }

        return ret;
      });
  }
}

function setStatus(p) {
  if (eStatus) eStatus.text(p);
}

function getNow() {
  return new Date();
}

function getScore(down, up, ping) {
  let score = 'Unfiltered Score: D' + down + ' U' + up + ' P' + ping;
  if (down >= 50 && up >= 25 && ping <= 10) {
    score = 'EXCELLENT';
  } else if (down >= 25 && up >= 10 && ping <= 60) {
    score = 'GREAT';
  } else if (down >= 10 && up >= 5 && ping <= 130) {
    score = 'GOOD';
  } else if (down >= 3 && up >= 1 && ping <= 200) {
    score = 'ACCEPTABLE';
  } else if (down < 3 || up < 1 || ping > 200) {
    score = 'BAD';
  }
  // return score;
  return `${down}|${up}|${ping}|${score}`;
}

export default function showScoreFunction() {
  console.log(getScore());

  //   document.getElementById(
  //     'code_function_container'
  //   ).innerHTML = `<h2>Scoring Function</h2><pre class="prettyprint"><code class="language-js">${getScore.toString()}</code></pre>`;
}
