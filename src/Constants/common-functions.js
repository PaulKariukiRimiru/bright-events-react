export const checkList = (list, emptyRender, infoRender) =>{
  if (list && list.length) {
    return infoRender()
  } else {
    return emptyRender()
  }
}