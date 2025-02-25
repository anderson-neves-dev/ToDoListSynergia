import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const user = useTracker(() => Meteor.user());

export const usuarioLogado = user;
