Dialogs Testing

Use NS7, Typescript and dialogs to select location from available list provided by Couchbase.

Issue: locations.Names is showing up as an object.  Dialogs.action actions needs Array<string>
Resolved: Changed locations definition by adding square brackets around "Array<string>"

public locations = { "type": "string", "Names": ["Array<string>"] };
