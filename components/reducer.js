
const initialState = {
    title:"მთავარი",
    menu:true,
    nav:"",
    page:"მთავარი",
   drawerlock:"unlocked",
   fullOpened:false,
   openDrawer:"",
   fetching:true,
   database:[],
   databaseNum:0


}



export default  (state=initialState,action) => {


    switch(action.type) {
        case "databaseNum":
        state.databaseNum = action.payload
        return state
        break;
       case "fetch": 
       state.fetching = action.payload
       return state;
      case "database":
      state.database = action.payload
      return state;
      break;
      case "SetOpenDrawer":
      state.openDrawer = action.payload
      return state;
        break;
        case "full":
        state.fullOpened = !state.fullOpened;
        return state;
        break;
        case "page":
        state.page = action.payload
        return state;
        break;
      case "setNav":
       state.nav = action.payload
       return state;
       case "drawerChangeMode":
         if(state.drawerlock !== "locked-closed") {
             state.drawerlock = "locked-closed"
         }else{
             state.drawerlock = "unlocked"
         }
       return state;
       break;

        default:
        return state;
    }



}
