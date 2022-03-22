import React, { Component } from 'react'
import withDragDropContext from '../../../../config/withDragDropContext'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import uuidV4 from 'uuid/v4'
import { minTime, maxTime, calendarInitialState } from '../../../../config/constants'
//Compoments
import BigCalendar from 'react-big-calendar'
import Dialog from 'material-ui/Dialog'
import Modal from './Modal'
import Sidebar from './Sidebar'
import Footer from './Footer'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton';

//Actions
import {
  GetEvents,
  UpdateEvents,
  GetEquipments,
  UpdateEquipments,
  GetPeople,
  UpdatePeople,
} from "../../../../helpers/db";
//Styles
import './styles/dragAndDrop/styles.css'
import './styles/less/styles.css'
import './styles/css/react-big-calendar.css'


BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const DragAndDropCalendar = withDragAndDrop(BigCalendar, {backend: false})

class Dnd extends Component {

  constructor(props) {
    super(props)

    this.state = calendarInitialState

    this.moveEvent = this.moveEvent.bind(this)

  }

  componentDidMount() {
    const newEvents = []
    const newEquipments = []
    const newPeople = []

    GetEvents(this.props.uid).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        newEvents.push(doc.data())
        this.setState({
          events: newEvents,
        })
      });
    })
    
    GetEquipments(this.props.uid).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        newEquipments.push(doc.data())
        this.setState({
          equipments: newEquipments,
        })
      });
    })

    GetPeople(this.props.uid).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        newPeople.push(doc.data())
        this.setState({
          people: newPeople,
        })
      });
    })
  }

  customTimeSlot = () => {
    return <label className="rbc-time-slot">Book</label>;
  };  

  moveEvent({event, start, end, room}) {
    const {events} = this.state
    const idx = events.indexOf(event)
    let updatedEvent = {...event, start, end}
    const nextEvents = [...events]
    console.log(event.id, updatedEvent)
    if (idx > -1) {
      if(this.props.uid === event.ownerId){
        nextEvents.splice(idx, 1, updatedEvent)
        UpdateEvents(event.id).update({start, end}).then(
          this.setState({
            events: nextEvents,
          })
        ).catch(error => {
          console.error('Update error', error);
        });
      }
    }
    // else if (event.id, nextEvents[0].id){

    // }
    else {
      if(this.props.uid === event.ownerId){
        const newEventId = uuidV4()
        updatedEvent = {...updatedEvent, id: newEventId, ownerId: this.props.uid}
        console.log(updatedEvent)
        nextEvents.push(updatedEvent)
        UpdateEvents(newEventId).set(updatedEvent).then(
          this.setState({
            events: nextEvents,
          })
        ).catch(error => {
          console.error('Create New Event error', error);
        });
      }
    }
  }

  selectEvent = (event) => {
    if(this.props.uid === event.ownerId){
      this.handleOpen(event)
    }
  }

  resizeEvent = (resizeType, {event, start, end}) => {
    const {events} = this.state

    if(this.props.uid === event.ownerId){
      const nextEvents = events.map(existingEvent => {
        return existingEvent.id === event.id
          ? {...existingEvent, start, end}
          : existingEvent
      })
    

      UpdateEvents(event.id).update({start, end}).then(
        this.setState({
          events: nextEvents,
        })
      ).catch(error => {
        console.error('Update error', error);
      });
    }
  }
  
  createEquipment = ({title, desc, room}) => {
    const {equipments} = this.state
    const newEquipmentId = uuidV4()
    const updatedEquipment = {...this.state.modal, id: newEquipmentId, ownerId: this.props.uid, title, desc, room}
    const nextEquipments = [...equipments]
    nextEquipments.push(updatedEquipment)
    UpdateEquipments(newEquipmentId).set(updatedEquipment).then(
      this.setState({
        equipments: nextEquipments,
      })
    ).catch(error => {
      console.error('Create New Equipment error', error);
    });
  }

  createPeople = ({title, desc, phone}) => {
    const {people} = this.state
    const newPeopleId = uuidV4()
    const updatedPeople = {...this.state.modal, id: newPeopleId, ownerId: this.props.uid, company: '@pc', title, desc}
    const nextPeople = [...people]
    nextPeople.push(updatedPeople)
    UpdatePeople(newPeopleId).set(updatedPeople).then(
      this.setState({
        people: nextPeople,
      })
    ).catch(error => {
      console.error('Create New People error', error);
    });
  }


  // #################### Update Events  #################################
  editEvent = ({id, title, desc, room}) => {
    const {events} = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === id
        ? {...existingEvent, title, desc, room}
        : existingEvent, console.log(this.props.uid)
    })

    UpdateEvents(id).update({title, desc, room}).then(
      this.setState({
        events: nextEvents,
      })
    ).catch(error => {
      console.error('Update Event error', error);
    });
  }

  // 
  editEquipment = ({id, title, desc, room}) => {
    const {equipments} = this.state

    const nextEquipments = equipments.map(existingEquipment => {
      return existingEquipment.id === id
        ? {...existingEquipment, title, desc, room}
        : existingEquipment
    })
    UpdateEquipments(id).update({title, desc, room}).then(
      this.setState({
        equipments: nextEquipments,
      })
    ).catch(error => {
      console.error('Update Equipment error', error);
    });
  }

  editPeople = ({id, title, desc, phone}) => {
    const {people} = this.state

    const nextPeople = people.map(existingPeople => {
      return existingPeople.id === id
        ? {...existingPeople, title, desc}
        : existingPeople
    })
    UpdatePeople(id).update({title, desc, phone}).then(
      this.setState({
        people: nextPeople,
      })
    ).catch(error => {
      console.error('Update Equipment error', error);
    });
  }

  deleteEvent = ({id}) => {
    const {events} = this.state

    const nextEvents = events.filter(existingEvent => {
      return existingEvent.id !== id
    })

    UpdateEvents(id).delete().then(
      this.setState({
        events: nextEvents,
      })
    ).catch(error => {
      console.error('Delete Event error', error);
    });
  }

  deleteEquipment = ({id}) => {
    const {equipments} = this.state

    const nextEquipments = equipments.filter(existingEquipment => {
      return existingEquipment.id !== id
    })

    UpdateEquipments(id).delete().then(
      this.setState({
        equipments: nextEquipments,
      })
    ).catch(error => {
      console.error('Delete error', error);
    });
  }

  deletePeople = ({id}) => {
    const {people} = this.state

    const nextPeople = people.filter(existingPeople => {
      return existingPeople.id !== id
    })

  UpdatePeople(id).delete().then(
      this.setState({
        people: nextPeople,
      })
    ).catch(error => {
      console.error('Delete error', error);
    });
  }

  handleClose = () => {
    this.setState({
      modalOpen: false,
      equipmentsOpen: false,
      peopleOpen: false,
      modal: calendarInitialState.modal,
    });
  };

  handleOpen = (event) => {
    this.setState({
      modalOpen: true,
      modal: event,
    });
  };

  handleEquipments = (event) => {
    this.setState({
      modal: event ? event : this.state.modal,
      equipmentsOpen: true
    });
  }

  handlePeople = (event) => {
    this.setState({
      modal: event ? event : {...this.state.modal, phone: null},
      peopleOpen: true
    });
  }


  render() {
    if (this.state.events) {
      return (
        <div className={'row'}>
          <div className={'col-2'}>
            <br/>
            <h5 style={{textAlign: 'center', color: '#03A9F4'}} >Create Event :</h5>
            <FloatingActionButton
              mini={true}
              className={'m-2'}
              onClick={() => this.handleEquipments()}
            >
              {/* <ContentAdd /> */}
              +
            </FloatingActionButton>

            
            <Sidebar events={this.state.equipments}
                     onClickEvent={this.handleEquipments}
            />

            <br/>

          </div>
          <div style={{height: 500, width: 1100}} className={'col-10'}>

            <h3 style={{textAlign: 'center', color: '#03A9F4'}} >Vichar (IHC)</h3>
            
            <DragAndDropCalendar
              events={this.state.events}
              defaultView="week"
              defaultDate={new Date()}
              views={['week', 'day', 'month']}
              min={minTime}
              max={maxTime}
              onEventDrop={this.moveEvent}
              resizable
              onEventResize={this.resizeEvent}
              onSelectEvent={this.selectEvent}
              timeSlotWrapper= {this.customTimeSlot}
            />

            <Dialog title="Update Meeting For - Vichar(IHC)"
                    modal={false}

                    open={this.state.modalOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
            >
              <Modal event={this.state.modal}
                     onRequestClose={this.handleClose}
                     onEditEvent={this.editEvent}
                     onDeleteEvent={this.deleteEvent}

              />
            </Dialog>
            <Dialog title="Create Meeting For - Vichar(IHC)"
                    modal={false}
                    open={this.state.equipmentsOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
            >
              <Modal event={this.state.modal}
                     onRequestClose={this.handleClose}
                     onCreatEvent={this.createEquipment}
                     onEditEvent={this.editEquipment}
                     onDeleteEvent={this.deleteEquipment}
              />
            </Dialog>
            <Dialog title="People"
                    modal={false}
                    open={this.state.peopleOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
            >
              <Modal event={this.state.modal}
                     onRequestClose={this.handleClose}
                     onCreatEvent={this.createPeople}
                     onEditEvent={this.editPeople}
                     onDeleteEvent={this.deletePeople}
              />
            </Dialog>
          </div>
          <Footer selectedEvents={this.state.events} />
        </div>
      )
    }

  }
}

export default withDragDropContext(Dnd)
