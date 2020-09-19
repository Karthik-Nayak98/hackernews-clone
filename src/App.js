import React from 'react';
import { NavBar } from './components/NavBar.component'
import { UserDetail } from './components/UserDetail.component';
import { UserSubmission } from './components/Submission.component';
import { Comment } from './components/Comment.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TopStory } from './containers/TopStory';
import { NewStory } from './containers/NewStory';
import { JobStory } from './containers/JobStory';
import { AskStory } from './containers/AskStory';
import { ShowStory } from './containers/ShowStory';
import { UserComments } from './components/UserComments.component';

export const App = () => {

  return (
    <div className="font-verdana">
      <NavBar />
      <Switch>
        <Route path="/new" component={() => <TopStory param='new' />} />
        <Route path="/top/" component={() => <TopStory param='top' />} />
        <Route path="/show" component={ShowStory} />
        <Route path="/ask" component={AskStory} />
        <Route path="/jobs" component={JobStory} />
        <Route path="/user/:id" component={UserDetail} />
        <Route path="/submit/:id" component={UserSubmission} />
        <Route path="/comments/:id" component={UserComments} />
        <Route path="/comment/:id" component={Comment} />
        {/* <Route exact path="/:id" component={TopStory} /> */}
        <Redirect exact from='/' to='/top' />
      </Switch>
    </div>
  )
}
