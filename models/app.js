
task = document.querySelector(".task")
add_button = document.querySelector(".add-button")

console.log(task,add_button)

add_button.addEventListener('click', function onClick() {
  if(task.value!=""){
  window.location.replace(`new/${task.value}`);
  }
    console.log(task.value)
});

let elements = document.querySelectorAll('.del-b');

elements.forEach((item) => {
    item.addEventListener('click', function clickEvent(){
      str = item.parentElement.childNodes[0].textContent.trim()
      newstr = JSON.stringify(str)
      console.log(str,newstr)
      window.location.replace(`del/${str}`);
        
    })
});