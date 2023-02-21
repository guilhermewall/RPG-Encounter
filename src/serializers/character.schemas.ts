import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserResponse } from "../interfaces/users/index";

import {
  ICharacterRequest,
  ICharacterResponse,
} from "../interfaces/characters";

const characterSerializer: SchemaOf<ICharacterRequest> = yup.object().shape({
  name: yup.string().required(),
  race: yup.string().required(),
  class: yup.string().required(),
  background: yup.string().required(),
  level: yup.number().positive().integer().notRequired(),
});

const characterResponseSerializer: SchemaOf<ICharacterResponse> = yup
  .object()
  .shape({
    name: yup.string().required(),
    race: yup.string().required(),
    class: yup.string().required(),
    background: yup.string().required(),
    level: yup.number().positive().integer().notRequired(),
    createdAt: yup.string().required(),
    id: yup.string().required(),
    isActive: yup.boolean().required(),
  });

export { characterSerializer, characterResponseSerializer };
