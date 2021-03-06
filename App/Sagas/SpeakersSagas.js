import { put, call } from 'redux-saga/effects'
import gql from 'graphql-tag'

import SpeakersActions from '../Redux/SpeakersRedux'

const getSpeakers = {
  query: gql`
  {
    speakers {
      name
      about
      image
      keywords
      social {
        twitter
        homepage
        github
        linkedin
      }
    },
  }`
}

// process STARTUP actions
export function * updateSpeakers (client, action) {
  yield put(SpeakersActions.speakersRequest())
  try {
    const { data: { speakers } } = yield call(client.query, getSpeakers)
    yield put(SpeakersActions.speakersSuccess(speakers))
  } catch (err) {
    yield put(SpeakersActions.speakersFailure())
  }
}
