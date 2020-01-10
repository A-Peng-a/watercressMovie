const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getstart(stars) {
  var arr = []
  var num = Math.floor(stars / 2);
  var num_two = stars % 2;
  for (var i = 0; i < num; i++) {
    arr.push('../img/xingxing.png')
  }
  for (var i = 0; i < 5 - num; i++) {
    if (num_two >= 1) {
      arr.push('../img/banxingxing.png');
      num_two = 0;
    } else {
      arr.push('../img/huixingxing.png')
    }

  }
  return arr
}


function newMovies(obj, off) {


  var moviesList = {
    title: obj.title,
    subjects: []
  }

  for (var index in obj.subjects) {
    var movie = {
      title: obj.subjects[index].title,
      movieImg: obj.subjects[index].images.large,
      average: obj.subjects[index].rating.average,
      id: obj.subjects[index].id,
      arrstars: getstart(obj.subjects[index].rating.average),
    }
    moviesList.subjects.push(movie)
  }
  if (off == "more") {
    return moviesList.subjects
  } else {
    return moviesList
  }
}
function newBook(res) {           //抽取返回数据
console.log(res)
  var bookarr = [];
  for (var index in res) {
    var obj = {
      title: res[index].title,
      _id: res[index]._id,
      id: res[index].id,
      average: res[index].rating.average,
      images: res[index].images.small,
      author: res[index].author,
      summary: res[index].summary,
      tags:res[index].tags,
      pubdate: res[index].pubdate,
      price: res[index].price
    }

    bookarr.push(obj)
    console.log(1)
  }
  return bookarr
}

module.exports = {
  getstart: getstart,
  newBook: newBook,
  newMovies: newMovies,
  formatTime: formatTime
}
