import {map, OperatorFunction} from "rxjs";

export function fbObjToArr(): OperatorFunction<any, any> {
  return map((response) => {
    return Object.keys(response)
      .map((key): any => ({
            ...response[key],
            id: key
          }
        )
      )
  })
}
