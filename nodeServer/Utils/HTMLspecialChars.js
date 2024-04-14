module.exports = (data) => {
  const dataTypeOf = typeof(data)
  let newData

  function convert(str)
  {
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    
    str = str.replace(/}/g, "&#125;");
    str = str.replace(/{/g, "&#123;");
    str = str.replace(/~/g, "&#126;");
    str = str.replace(/`/g, "&#96;");
    str = str.replace(/;/g, "&#59;");
    str = str.replace(/,/g, "&#44;");
    

    
    // str = str.replace(/\)/g, "&#41;");
    // str = str.replace(/\(/g, "&#40;");
    // str = str.replace(/\[/g, "&#91;");
    // str = str.replace(/./g, "&#46;");
    // str = str.replace(/]/g, "&#93;");


    // the below are left for url cases 
    // str = str.replace(/%/g, "&#039;");
    // str = str.replace(/?/g, "&#039;");
    // str = str.replace(/&/g, "&amp;");
    // str = str.replace(/:/g, "&#58;");
    return str;
  }
  
  
  function handleArrays(xArray){
    let type;
    let newArray = []  
    xArray.map((data, i) => {  
      type = typeof(data)
      if(type === 'string'){ 
        newArray.push(convert(data))
      }
      else if(type === 'array'){
        newArray.push(handleArrays(data))
      }
      else if(type === 'number'){
        newArray.push(convert(data))
      }
      else{
        newArray.push(convert(data))
      }
      return(i)
    })
    
    return(newArray)
  };

  function handleObjects(obj){
    let type;
    for (props in obj) {
      type = typeof(obj[props])

      if(type === 'string'){ 
        obj[props] = `${convert(obj[props])}`
      }
      else if(type === 'array'){
        obj[props] = handleArrays(obj[props])
      }
      else if(type === 'object'){
        obj[props] =  handleObjects(obj[props])
      }
      else if(type === 'number'){
        obj[props] = `${obj[props]}`
      }
      else{
        obj[props] = `${obj[props]}`
      }

    }
    return (obj)
  }


  function handleSanitization(data, dataTypeOf){
    let newdata
      if(dataTypeOf === 'string'){ 
        newdata = `${convert(data)}`
      }
      else if(dataTypeOf === 'array'){
        newdata = handleArrays(data)
      }
      else if(dataTypeOf === 'object'){
        newdata = handleObjects(data)
      }
      else if(dataTypeOf === 'number' || dataTypeOf === 'boolean'){
        newdata = `${data}`
      }
      else{
        newdata = `${data}`
      }
    return (newdata)
  }
  newData = handleSanitization(data, dataTypeOf)
  return (newData)
}