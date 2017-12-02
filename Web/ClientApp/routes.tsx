import * as React from 'react';
import { Route } from 'react-router-dom';
import { Activity } from './components/Activity/Activity';

export const routes = 
    <Route exact path='/' component={ Activity } />;
