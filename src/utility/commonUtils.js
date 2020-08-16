function getUserInfo(data){
    const membersData = getSafeProperty(()=>data.members); 
    if(!membersData) return null;
    let filteredUserInfo = [];    
    membersData.map((member)=>{
        const {id, real_name="",tz=""} = member; 
        let user ={}
        if(id){
            user["id"] = id;
            user["name"] = real_name;
            user["tz"] = tz;
            filteredUserInfo.push(user);
        }
    })

    return filteredUserInfo;
}

function getUserActivityData(searchId,data) {
    const membersData = getSafeProperty(()=>data.members); 
    if(!membersData) return null;
    
    for (const member of membersData) {
        const {id,activity_periods} = member;
        if(id == searchId){
            return activity_periods;
        }
    }
}

function getSafeProperty(fn) {
    try {
      return fn();
    } catch (e) {
      return undefined;
    }
  }

  module.exports={
    getUserInfo,getSafeProperty,getUserActivityData
}