import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
function getPdf (dom,title) {
    html2Canvas(dom, {
        allowTaint: true
    }).then(function (canvas) {
            let contentWidth = canvas.width//获取内容宽高
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89//算出592.28/841.89宽高比的高度
            let nowHeight = contentHeight
            let position = 0
            let imgWidth = 595.28//表示画出来的图片大小，无法影响内容大小
            let imgHeight = 595.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')
            if (nowHeight < pageHeight) {//内容高度比页面高度小，即可全部显示出来
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
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
            PDF.save(title + '.pdf')
        }
    )
}
export default getPdf;
