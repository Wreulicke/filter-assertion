export interface AssertionFactory {
    (schema: any): (actual: any) => void;
}
