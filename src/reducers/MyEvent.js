import { Record } from 'immutable';

class MyEvent extends Record({
    id: undefined,
    name: '',
    description: '',
    status: 0,
    date: undefined,
    time: '00:01',
}) {
    getProperty(sPropName) {
        console.log(sPropName, this.hasOwnProperty(sPropName))
    }
    
    getDate() {
        return this.date;
    }
    setDate( newDate ) {
        return this.set('date', newDate);
    }

    getTime() {
        return this.time;
    }
    setTime( newTime ) {
        return this.set('time', newTime);
    }
    
    getStatus() {
        return this.status;
    }
    setStatus( newStatus ) {
        return this.set('status', newStatus);
    }

    getName() {
        return this.name;
    }
    setName( newName ) {
        return this.set('name', newName);
    }

    getDescription() {
        return this.description;
    }
    setDescription( newDesc ) {
        return this.set('description', newDesc);
    }

    getId() {
        return this.id;
    }
    setId( newId ) {
        return this.set('id', newId);
    }
}

export default MyEvent;