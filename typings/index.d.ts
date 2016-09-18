declare module 'lodash.find' {
  var find: <T> (collection: Array <T> , predicate: (value: T, key: any, origin: any) => boolean) => T;
  export = find;
}
declare module 'lodash.mapValues'{
  var mapValues: (o:any, map:(...o:any[]) => any) => any
  export = mapValues;  
}