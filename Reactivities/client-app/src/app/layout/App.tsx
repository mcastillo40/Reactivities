import React, { useState, useEffect, Fragment} from 'react';
import {Container} from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { ActivitiesAgent } from '../api/agent';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((activity => activity.id === id))[0])
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleCreateActivity = (activity: IActivity) => {
    ActivitiesAgent.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      });
  }

  const handleEditActivity = (activity: IActivity) => {
    ActivitiesAgent.update(activity)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
  }

  const handleDeleteActivity = (activityId : string) => {
    ActivitiesAgent.delete(activityId)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== activityId)]);
      })
  }

  useEffect(() => {
    ActivitiesAgent.list()
      .then(res => {
        let activities: IActivity[] = [];

        res.forEach(activity => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity);
        })

        setActivities(activities)
      })
  }, []);

  return (
    <Fragment> 
        <NavBar openCreateForm={handleOpenCreateForm}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
            activities={activities} 
            selectActivity={handleSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
            createActivity={handleCreateActivity}
            editActivity={handleEditActivity}
            deleteActivity={handleDeleteActivity}
          />
        </Container>
    </Fragment>
  );
}

export default App;