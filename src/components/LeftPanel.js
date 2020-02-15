import React from 'react';
import { ReactReduxContext } from 'react-redux';
import MyData from '../reducers/MyData';

class Fetchdata extends React.Component {
    componentDidMount(){
        const store = this.props.store;
        store.dispatch({
            type: 'FETCH',
        })
    }
    render() {
        return (
            <div>&nbsp;</div>
        )
    }
}

class LeftPanel extends React.Component {
    
    constructor(props) {
        
        super(props);

        this.state = {
            list: new MyData(),
            filter: 1, //active
        }

        this.selectEventItem = this.selectEventItem.bind(this);
        this.clickDetail = this.clickDetail.bind(this);
        this.changeFilter = this.changeFilter.bind(this);

    }

    componentWillUnmount() {
        this.unsub();
    }

    clickDetail( store ) {
        store.dispatch({
            type: 'SELECT',
            index: -1,
        })

        window.showPanel('panelRight');
    }

    selectEventItem( index, id, store ) {
        store.dispatch({
            type: 'SELECT',
            index: index,
            id: id,
        })

        window.showPanel('panelRight');
    }

    changeFilter(event, store) {
        store.dispatch({
            type: 'SELECT',
            index: -1,
        })

        this.setState({
            filter: parseInt(event.target.value),
        })
    }

    render() {
        return (
            <React.Fragment>
                    
                <ReactReduxContext.Consumer>
                {({ store }) => {
                    const handle = () => {
                        const list = store.getState();
                        this.setState({
                            list: list
                        })
                    }

                    this.unsub = store.subscribe(handle.bind(this));
                    
                    const selindex = this.state.list.getSelectedIndex();
                    const selid = (selindex >= 0)?this.state.list.getSelected(selindex).getId():"";
                    
                    return (
                        <div id="panelLeft" className="left-panel">
                        
                        <h4>Events List</h4>
                        <a onClick={() => this.clickDetail(store)} className="btn-action"><i className="icons">&#43;</i><span>Add Event</span></a>
                        
                        <div className="filter-panel">
                            <select value={this.state.filter} onChange={(event) => this.changeFilter(event, store)}>
                                <option value="0">All</option>
                                <option value="1">Active</option>
                                <option value="2">Cancelled</option>
                                <option value="3">Finished</option>
                            </select>
                        </div>

                        <div className="list-panel">
                        <ul>
                        {
                            this.state.list.getList(this.state.filter).map((item, index) => {
                                const sname = item.getName();
                                const status = item.getStatus();
                                const sid = item.getId();

                                let clsName = (status === 1)?"cancel":"item";
                                clsName = (status === 2)?"finish":clsName;
                                clsName = (index === selindex && sid === selid)?clsName+"-selected":clsName;
                                
                                // active
                                clsName = (this.state.filter === 1 && status === 1)?"hide":clsName;
                                clsName = (this.state.filter === 1 && status === 2)?"hide":clsName;
                                
                                // cancel
                                clsName = (this.state.filter === 2 && status === 0)?"hide":clsName;
                                clsName = (this.state.filter === 2 && status === 2)?"hide":clsName;
                                
                                // finish
                                clsName = (this.state.filter === 3 && status === 0)?"hide":clsName;
                                clsName = (this.state.filter === 3 && status === 1)?"hide":clsName;
                                
                                return (
                                    <li className={clsName} key={index} onClick={() => this.selectEventItem(index, sid, store) }>
                                        <span className="list-name">{ sname }</span>
                                    </li>
                                )
                            })
                        }
                        </ul>
                        <Fetchdata store={store} />
                        </div>
                        
                        </div>
                        
                    )
                }}
                </ReactReduxContext.Consumer>
                
                
            </React.Fragment>
            
        )
    }
}

export default LeftPanel;