

window.addEventListener('load',()=>{
    document.getElementById('send-button').addEventListener('click',()=>{

        let selected = document.getElementById('type-selector').value;
        
        

        let title = document.getElementById('title-input').value;
        
      
        let obj = {"title":title,"type":selected};
        let jsonData = JSON.stringify(obj);

        fetch('/title',{
            method: 'POST',
            headers: {
                "Content-type": "application/json"

            },
            body: jsonData
        })
        .then(response=>response.json())
        .then(data=>{console.log(data)});




    })

    document.getElementById('request-button').addEventListener('click',()=>{
        fetch('/getTitle')
        .then(resp=>resp.json())
        .then(data=>{
         
            document.getElementById('recommendation-info').innerHTML="";

            let wanted = document.getElementById('ask-type').value;

            let requesting;

            if(wanted=='Read'){
                requesting = 'Book';
            }else if(wanted=='Watch'){
                requesting = 'Movie';
            } else if(wanted=='Listen'){
                requesting = 'Music';
            }
            
            for(let i=0;i<data.data.length;i++){
              
                
                if(data.data[i].type==requesting){

                    let string =  data.data[i].title;
                    console.log(string);
                    let elt = document.createElement('p');
                    elt.innerHTML = string;
                    document.getElementById("recommendation-info").appendChild(elt);
                }
                
            }
        })


    })
})