import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

/**
 * 传入单个dom或者dom集合（数组）
 * @param dom
 * @param title
 */
function getPdf(dom, title) {
    if (!dom.length && dom.length !== 0) {
        html2Canvas(dom, {
            allowTaint: true
        }).then(function (canvas) {
                let contentWidth = canvas.width//获取内容宽高
                let contentHeight = canvas.height
                let pageHeight = contentWidth / 592.28 * 841.89//算出592.28/841.89宽高比的高度
                let nowHeight = contentHeight
                let position = 0
                let imgWidth = 592.28//表示画出来的图片大小，无法影响内容大小
                let imgHeight = 592.28 / contentWidth * contentHeight
                let pageData = canvas.toDataURL('image/jpeg', 1.0)
                let PDF = new JsPDF('', 'pt', 'a4')
                if (nowHeight < pageHeight) {//内容高度比页面高度小，即可全部显示出来
                    PDF.addImage(pageData, 'JPEG', 0, 3, imgWidth, imgHeight)
                } else {
                    while (nowHeight > 0) {
                        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        nowHeight -= pageHeight//先画一页，多出比例的部分，添加另外一页画
                        position -= 841.89
                        if (nowHeight > 0) {
                            PDF.addPage()//可能这个方法里面也有addImage的功能的代码，while循环，画到最后
                        }
                    }
                }
                PDF.save(title + '.pdf')
            }
        )
    } else {
        draw(dom, title)
    }
}

function draw(dom, title, index = 0, PDF = new JsPDF('', 'pt', 'a4')) {
    if (index !== 0) PDF.addPage()
    if (index === dom.length) return
    html2Canvas(dom[index], {
        allowTaint: true
    }).then(function (canvas) {
            let contentWidth = canvas.width//获取内容宽高
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89//算出592.28/841.89宽高比的高度
            let nowHeight = contentHeight
            let position = 0
            let imgWidth = 592.28//表示画出来的图片大小，无法影响内容大小
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            if (nowHeight < pageHeight) {//内容高度比页面高度小，即可全部显示出来
                PDF.addImage(pageData, 'JPEG', 0, 3, imgWidth, imgHeight)
            } else {
                while (nowHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    nowHeight -= pageHeight
                    position -= 841.89
                    if (nowHeight > 0) {
                        PDF.addPage()
                    }
                }
            }
            index++
            if (index === dom.length)
                PDF.save(title + '.pdf')
            draw(dom, title, index, PDF)
        }
    )
}

export default getPdf;
