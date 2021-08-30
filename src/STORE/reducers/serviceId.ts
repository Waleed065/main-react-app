import {tabs} from '../constants'
import {stringActionType} from '../../types';
import {setServiceIdConst} from '../constants'

export default function serviceId(
  state: string = tabs[0],
  action: stringActionType
): string {
  switch (action.type) {
    case setServiceIdConst:
      return action.payload;
    default:
      return state;
  }
}
