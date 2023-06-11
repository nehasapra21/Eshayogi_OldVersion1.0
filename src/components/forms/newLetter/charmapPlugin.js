const charmapChars = [
  [0x0043, 'ब्'],
  [0x0045, 'म्'],
  [0x0046, 'थ्'],
  [0x0047, 'ळ'],
  [0x0048, 'भ्'],
  [0x0049, 'प्'],
  [0x004a, 'श्र'],
  [0x004b, 'ज्ञ'],
  [0x004c, 'स्'],
  [0x004f, 'व्'],
  [0x0050, 'च्'],
  [0x0052, 'त्'],
  [0x0054, 'ज्'],
  [0x0055, 'न्'],
  [0x0058, 'ग्'],
  [0x0059, 'ल्'],
  [0x005a, 'र्'],
  [0x005b, 'ख्'],
  [0x005f, 'ऋ'],
  [0x007b, 'क्ष्'],
  [0x007e, '्'],
  [(0x0061, 'ं')],
  [0x0066, 'ि'],
  [0x0068, 'ी'],
  [(0x0060, 'ृ')],
  [0x006b, 'ा'],
  [0x0071, 'ु'],
  [0x0077, 'ू'],
  [0x0073, 'े'],
  [0x0057, 'ॅ'],
  [(0x0053, 'ै')],
  [(0x00a9, 'ौ')],
  [(0x005d, ',')],
  [0x005e, "'"],
  [0x005c, '?'],
  [0x00bc, '('],
  [0x00bd, ')'],
]

// const tinyDiv = document.getElementsByClassName('tox-mbtn')
// const addClassToTiny = () => {
//   const accessTabs =
//     document.getElementsByClassName('tox-menu-nav__js')
//   console.log('access tabe', accessTabs)
//   if (accessTabs.length !== 0) {
//     setTimeout(() => {
//       accessTabs[6].addEventListener('click', () => {
//         const specialChar =
//           document.getElementsByClassName('tox-tab')

//         setTimeout(() => {
//           specialChar[specialChar.length - 1].addEventListener(
//             'click',
//             () => {
//               let userDefined = document.getElementsByClassName(
//                 'tox-collection__group'
//               )
//               console.log()
//               setTimeout(() => {
//                 userDefined[0].classList.add('userDefSym')
//               }, 200)
//             }
//           )
//         }, 500)
//       })
//     }, 200)
//   }
// }
// tinyDiv[3].addEventListener('click', () => {
//   addClassToTiny()
// })
// tinyDiv[3].addEventListener('mouseover', () => {
//   addClassToTiny()
// })

export { charmapChars }
