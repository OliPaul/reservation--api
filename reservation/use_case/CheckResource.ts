export class CheckResource {
    execute(resourceId: String) {
        if(resourceId != "1337")
            return false;
        return true;
    }
}