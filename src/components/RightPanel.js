import React from 'react';
import { ReactReduxContext } from 'react-redux';
import MyEvent from '../reducers/MyEvent';

const getUniqueId = () => {
  return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
}

class RightPanel extends React.Component {
  
    constructor(props) {
      super(props);

      this.state = {
        selected: new MyEvent(),
        name: '',
        description: '',
        status: 0,
        index: -1,
        id: '',
        date: '2010-01-09',
        time: '02:01 AM',
      }

      this.changeName = this.changeName.bind(this);
      this.changeDescription = this.changeDescription.bind(this);
      this.changeStatus = this.changeStatus.bind(this);
      this.changeDate = this.changeDate.bind(this);
      this.changeTime = this.changeTime.bind(this);
    }

    componentWillUnmount() {
      this.unsub();
    }

    changeDate(event) {
      this.setState({
        date: event.target.value,
      })
    }
    changeTime(event) {
      this.setState({
        time: event.target.value,
      })
    }

    clickList( store ) {
      store.dispatch({
        type: 'SELECT',
        index: -1,
      })
      window.showPanel('panelLeft');
    }

    handleClick( store ) {
      store.dispatch({
        type: 'ADD',
        id: getUniqueId(),
        text: this.state.name,
        content: this.state.description,
        date: this.state.date,
        time: this.state.time,
        mode: 1,
      })

    }

    handleClick2( store ) {
      store.dispatch({
        type: 'EDIT',
        index: this.state.index,
        text: this.state.name,
        content: this.state.description,
        date: this.state.date,
        time: this.state.time,
        status: parseInt(this.state.status),
      })
    }

    deleteClick( store ) {
      if(window.confirm("Do you want to delete this event?")){
        store.dispatch({
          type: 'DELETE',
          index: this.state.index,
          id: this.state.id,
          mode: 1,
        })
        window.showPanel('panelLeft');
      }
    }

    changeName(evt) {
      this.setState({
        name: evt.target.value,
      })
    }
    changeDescription(evt) {
      this.setState({
        description: evt.target.value,
      })
    }

    changeStatus(evt) {
      this.state.selected.getProperty('selectedIndex');

      this.setState({
        status: evt.target.value,
      })
    }

    render() {
        
        const mylist = this.state.selected;
        const sid = mylist.getId();
        const statusDisabled = (sid)?"":"disabled";
        
        return (
          <ReactReduxContext.Consumer>
          {({ store }) => {
            const handle = () => {
                
              let stoday = new Date().toLocaleDateString("ja-JP").replace(/\//g, '-');
              const token = stoday.split("-");
              stoday = token[0]+"-"+(parseInt(token[1])<10?"0"+token[1]:token[1])+"-"+token[2];

              const list = store.getState();
              const selected = list.getSelected();
              const sid = selected.getId();
              const sname = selected.getName();
              const sdescription = selected.getDescription()
              const index = list.getSelectedIndex();
              const status = selected.getStatus();
              const sdate = selected.getDate() || stoday;
              const stime = selected.getTime() || new Date().toLocaleTimeString("ja-JP");
              
              this.setState({
                selected: selected,
                id: sid,
                name: sname,
                description: sdescription,
                index: index,
                status: status,
                date: sdate,
                time: stime
              })
            }

            this.unsub = store.subscribe(handle.bind(this));

            return (
              <div id="panelRight" className="right-panel">
              
                <h4>Event Detail</h4>

                <a id="btnBackList" onClick={() => this.clickList(store)} className="btn-action">
                  <i className="icons">&lt;</i>
                  <span>Back to List</span>
                </a>

                <div className="detail-panel">

                  <div className="input-panel">

                    <div className="item-panel">
                      <label>Date/Time</label>
                      <input onChange={this.changeDate} value={ this.state.date } type="date" />
                      &nbsp;<input onChange={this.changeTime} value={ this.state.time } type="time" />
                    </div>

                    <div className="item-panel">
                      <label>Name</label>
                      <input value={ this.state.name } onChange={(event) => this.changeName(event)} type="text" placeholder="Put event name" />
                    </div>

                    <div className="item-panel">
                      <label>Description</label>
                      <textarea value={ this.state.description } onChange={(event) => this.changeDescription(event)} placeholder="Put event description"></textarea>
                    </div>
                    
                    <div className="item-panel">
                      <label>Status</label>
                      <select value={this.state.status} onChange={(event) => this.changeStatus(event)} disabled={ statusDisabled }>
                        <option value="0">Active</option>
                        <option value="1">Cancelled</option>
                        <option value="2">Finished</option>
                      </select>
                    </div>
              
                    <div className="button-panel">
                      <button disabled={
                        (this.state.index >= 0)?'disabled':''
                      } onClick={ () => this.handleClick(store) } id="ButAddEvent">Add Event</button>
                      <button disabled={
                        (this.state.index >= 0)?'':'disabled'
                      } onClick={ () => this.deleteClick(store) } id="ButDeleteEvent">Delete</button>
                      <button disabled={
                        (this.state.index >= 0)?'':'disabled'
                      } onClick={ () => this.handleClick2(store) } id="ButUpdateEvent">Update</button>
                    </div>
                  
                  </div>
            
                </div>

              </div>
            )
          }}
          </ReactReduxContext.Consumer>
      
        )
    }

}

export default RightPanel;