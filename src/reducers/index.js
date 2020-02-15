import MyEvent from './MyEvent';
import MyData from './MyData';

const initialData = () => {
    return new MyData();
}

const addEvent = (action, state) => {
    
    let list = state.getList();
    
    const newEvent = new MyEvent({
        id: action.id,
        name: action.text,
        description: action.content,
        date: action.date || '2009-03-01',
        time: action.time || '18:30',
    })
    
    state = state.setList(list.push(newEvent));
    
    const mode = (action.hasOwnProperty('mode'))?action.mode:0;
    if(mode > 0) {
        const newindex = state.getListCount() - 1;
        state = state.setSelectedIndex( newindex );
    }
    
    return state;
}

const editEvent = (action, state) => {
    let list = state.getList();
    const index = action.index;
    let selected = list.get(index);
    selected = selected.setName(action.text);
    selected = selected.setDescription(action.content);
    selected = selected.setDate(action.date);
    selected = selected.setTime(action.time);
    selected = selected.setStatus(action.status);
    return state.setList(list.set(index, selected));
}

const deleteEvent = (action, state) => {
    const mode = (action.hasOwnProperty('mode'))?action.mode:0;

    let list = state.getList();
    
    const sid = action.id;
    const _list = list.filter((item)=>{
        const id = item.getId();
        return (id !== sid);
    })

    state = state.setList(_list);
    
    if(mode > 0) {
        state = state.setSelectedIndex( -1 );
    }

    return state;
}

const selectEvent = (action, state) => {
    const index = state.getIndexById(action.id);
    return state.setSelectedIndex( index );
}

const events = (state = initialData(), action) => {
    
    switch (action.type) {
        case 'DELETE':
            return deleteEvent(action, state)
        case 'ADD':
            return addEvent(action, state)
        case 'EDIT':
            return editEvent(action, state)
        case 'SELECT':
            return selectEvent(action, state)
        default:
            return state;
    }

}

export default events;