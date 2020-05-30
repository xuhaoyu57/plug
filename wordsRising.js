function wordsRising(options) {
    document.querySelector('head').innerHTML = `
        <style>
          .word {
              position: fixed;
              font-weight: bold;
          }
        </style>
    `
    this.word = options.word;
    this.startX = 0;
    this.startY = 0;
    this.index = 0;
    this.colorArr = ['#0071ff', '#c000ff', '#ff8100', '#00adff', '#ffe000', '#ff0000']
    let _this = this
    try {
        window.addEventListener('click', function() {
            // if (_this.startX == 0 && _this.startY == 0) {
            //     _this.startX = event.clientX
            //     _this.startY = event.clientY
            // // 之前该类为移动触发，并需要每次移动一定距离才触发特效，现在改为点击触发，因此不需要限制
            // } else {
            //     if (Math.abs(_this.startX - event.clientX) > 50 || Math.abs(_this.startY - event.clientY) > 50) {
            //         _this.startX = 0
            //         _this.startY = 0
            _this.draw()
            _this.index++
            if (_this.index >= _this.word.length) {
                _this.index = 0
            }
            //     }
            // }
        })
    } catch (e) {
        console.log(e)
    }
}

wordsRising.prototype.draw = function() {
    document.body.append(this.creatSpan(this.word[this.index]))
}
wordsRising.prototype.getColor = function() {
    var index = parseInt(Math.random() * (this.colorArr.length - 0.1))
    // let str = '#' + parseInt(Math.random() * 999999)
    return this.colorArr[index];
}
wordsRising.prototype.creatSpan = function(text) {
    let dom = document.createElement('span');
    dom.className = 'word';
    dom.style.color = this.getColor();
    dom.style.top = event.clientY + 'px';
    dom.style.left = event.clientX + 'px';
    dom.innerText = text;
    this.setOpacity(dom)
    this.setCoordinate(dom)
    return dom
}
wordsRising.prototype.setOpacity = function(dom) {
    let num = 1
    let timer = setInterval(() => {
        num -= 0.15
        dom.style.opacity = num
        if (num <= 0) {
            clearInterval(timer)
            document.body.removeChild(dom)
        }
    }, 200)
}
wordsRising.prototype.setCoordinate = function(dom) {
    let y = event.clientY
    let val = 0
    let val2 = 0
    let timer = setInterval(() => {
        val += 0.03
        if (val > 2.5) {
            val2 = 2.5
        } else if (val < 0.5) {
            val2 = 0.2
        } else {
            val2 = val
        }
        y -= val2
        if (dom) {
            dom.style.top = y + 'px'
        } else {
            clearInterval(timer)
        }
    }, 10)
}
