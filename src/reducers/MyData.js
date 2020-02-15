import Immutable, { Record } from 'immutable';
import MyEvent from './MyEvent';

class MyData extends Record({
    list: Immutable.List(),
    selectedIndex: -1
}) {
    getProperty(sPropName) {
        console.log(sPropName, this.hasOwnProperty(sPropName))
    }
    
    getSelected() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        const sTimeNow = hours + ':' + minutes;
        const selEvent = (this.selectedIndex >= 0)?this.list.get(this.selectedIndex):new MyEvent({ time: sTimeNow });
        return selEvent;
    }
    getIndexById( sId ) {
        return this.list.findIndex((item) => {
           return (item.id === sId);
       })
    }
    getListCount() {
        return this.list.count();
    }
    getList(mode = 0) {
        if(mode === 0) return this.list;
        const list = this.list.filter((item, index) => {
            return (item.getStatus() === (mode - 1))
        })
        return list;
    }
    setList( list ) {
        return this.set('list', list);
    }
    getSelectedIndex() {
        return this.selectedIndex;
    }
    setSelectedIndex( index ) {
        return this.set('selectedIndex', index);
    }
}

export default MyData;