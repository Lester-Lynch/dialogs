import { Observable, Dialogs, ObservableArray } from '@nativescript/core';
import { Couchbase } from "nativescript-couchbase-plugin";
import { ObservableProperty } from "./observable-property-decorator";

export class HelloWorldModel extends Observable {
    public propeertyDatabase: Couchbase;
    
    public locations = { "type": "string", "Names": "Array<string>" };
    public profile = { "type": "string", "UUID": "string", "Name": "string", "HRA": "string", "defaultLocation": "string" };

    @ObservableProperty() location = "default";
    @ObservableProperty() scanLocations = ["One","Two","Three"];



    constructor() {
        super();

        console.log("Constructor...");

        this.propeertyDatabase = new Couchbase("propeerty-database");
        var syncPropeerty = this.propeertyDatabase.createReplication("ws://192.168.0.13:4984/propeerty", "pull");
        syncPropeerty.start();
    
        this.locations = this.propeertyDatabase.getDocument("Locations");
        console.log("CB: locations: ");
        console.dir(this.locations);

        // this.dbInit();
    }

    dbInit() {
        this.propeertyDatabase = new Couchbase("propeerty-database");
        var syncPropeerty = this.propeertyDatabase.createReplication("ws://192.168.0.13:4984/propeerty", "pull");
        syncPropeerty.start();
    
        this.locations = this.propeertyDatabase.getDocument("Locations");
        console.log("CB: locations: ");
        console.dir(this.locations);
    }


    onTap() {
        console.log("onLocation: Dialogs");
        console.log(this.scanLocations);
        console.log(this.locations.Names);
        Dialogs.action({
            message: "Select scaning location",
            cancelButtonText: "Cancel",
            actions: this.locations.Names
        }).then(result => {
            this.location = result;
            console.log("Location: " + this.location);
            console.log("Dialog result: " + result);
        });
    }
}
