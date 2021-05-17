export class CheckResource {
    execute(resourceId: number) {

        if (resourceId != 1337) {
            return false;
        }
        return true;

    }
}