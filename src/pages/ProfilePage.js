import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, TextArea, Form } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { addBio } from '../store/actions/index';
import UserEvents from '../components/UserEvents';
import UserTutorials from '../components/UserTutorials';

class ProfilePage extends Component {
  state = {
    showBioButton: true,
    showBioInput: false,
    bio: ""
  }

  showBioInput = () => {
    this.setState({
      showBioButton: false,
      showBioInput: true
    })
  }

  renderBioButton = () => {
    if (this.props.bio) {
      return (
        <Fragment>
          <h2>Bio</h2>
          {this.props.bio}
        </Fragment>
      )
    } else if (this.state.showBioButton) {
      return <Button onClick={this.showBioInput}>Add a bio</Button>;
    } else {
      return null;
    }
  }

  handleBioInput = (e, data) => {
    this.setState({bio: data.value})
  }

  handleAddBio = () => {
    this.props.addBio(this.props.user.id, this.state.bio)
    this.setState({
      showBioInput: false
    })
  }

  render(){
    return (
      <Fragment>
        <h2>{this.props.username}</h2>
        <img src='https://cdn1.vectorstock.com/i/1000x1000/73/15/female-avatar-profile-icon-round-woman-face-vector-18307315.jpg' alt="" height="300px" width="300px" />
        {this.props.avatar}
        <div>{this.renderBioButton()}</div>
        {this.state.showBioInput ?
          <Fragment>
            <Form onSubmit={this.handleAddBio}>
              <TextArea onChange={this.handleBioInput} value={this.state.bio} autoHeight placeholder='Add a bio' rows={2} />
              <Button>Submit</Button>
            </Form>
          </Fragment> : null}
          <h2>My Events</h2>
          <UserEvents events={this.props.user.events}/>
          <h2>Saved Tutorials</h2>
          <UserTutorials tutorials={this.props.user.tutorials}/>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  avatar: state.userReducer.user.avatar,
  username: state.userReducer.user.username,
  bio: state.userReducer.user.bio
})

export default withAuth(connect(mapStateToProps, { addBio })(ProfilePage));
