class SearchQuery{

  constructor(masterKeyWords , string){
  		this.mkw = masterKeyWords;
      this.str= string;
  }

  returnSortedID(){

            let matchedQueryID= {};

            let trimed = this.str.replace(/\s+/g,' ').trim().toLowerCase()
            let arr= trimed.split(" ");
            let i = 0;
            let finalArray= [];

            while(arr.length!==0){
              let word = arr.shift();
              let filteredArray= this.filterMasterKeys(this.mkw , word , matchedQueryID);
              finalArray=[...finalArray,...filteredArray];
            }

            var sortable = [];

            for (var id in matchedQueryID) {
                sortable.push([id, matchedQueryID[id]]);
            }

            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });


            sortable.reverse();
              console.log(sortable)
             return sortable
  }

  filterMasterKeys(masterKeyWords , query , matchedQueryID){

      let firstMatch=[];
      let secondMatch=[];
      let thirdMatch= [];

    masterKeyWords.map(function(m){

          let arr= Object.keys(m);
					let id_array= m[arr[0]].id;

          if(arr[0] === query){
						console.log('how many times?')
            firstMatch.push(m);

             for(let id of id_array){
             			matchedQueryID[id]= matchedQueryID[id]+3 || 3;
             }

          }

     	     else if(arr[0][0] === query[0]){

            if(arr[0].includes(query)){
             secondMatch.push(m);

              for(let id of id_array){ matchedQueryID[id]= matchedQueryID[id]+2 || 2; }

             }
             else
             { thirdMatch.push(m)
              for(let id of id_array){ matchedQueryID[id]= matchedQueryID[id]+1 || 1; }
              }

          }
    })

		let filteredMk = [...firstMatch, ...secondMatch , ...thirdMatch ];

    return filteredMk

  }


}
