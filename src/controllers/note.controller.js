const { successUtils } = require('../utils');
const config = require('../config/note.config.json');
const {
  getListValidation, getId, addNoteValidation, updateNoteValidation,
} = require('../validations');
const { noteService } = require('../services');

const getListCount = async (req, res, next) => {
  try {
    const validatedReqData = await getListValidation.validate(req.query);
    const count = await noteService.getListCount({
      account_id: req.account.id,
      ...validatedReqData,
    });
    return successUtils.handler({ count }, req, res);
  } catch (err) {
    return next(err);
  }
};


const getConfig = async (req, res, next) => {
  try {
    return successUtils.handler({ config }, req, res);
  } catch (err) {
    return next(err);
  }
};


const getList = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(';');
  }
  try {
    const validatedReqData = await getListValidation.validate(reqData);
    const notes = await noteService.getList({
      account_id: req.account.id,
      ...validatedReqData,
    });
    return successUtils.handler({ notes }, req, res);
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const id = await getId.validate(noteId);
    const note = await noteService.getOne({
      account_id: req.account.id,
      id,
    });
    return successUtils.handler({ note }, req, res);
  } catch (err) {
    return next(err);
  }
};

const addOne = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const validatedReqData = await addNoteValidation.validate(reqBody);
    const note = await noteService.addOne({
      account_id: req.account.id,
      ...validatedReqData,
    });
    return successUtils.handler({ note }, req, res);
  } catch (err) {
    return next(err);
  }
};

const updateOne = async (req, res, next) => {
  const { noteId } = req.params;
  const reqBody = req.body;
  try {
    const id = await getId.validate(noteId);
    const validatedReqData = await updateNoteValidation.validate(reqBody);
    const note = await noteService.updateOne({
      account_id: req.account.id,
      id,
      ...validatedReqData,
    });
    return successUtils.handler({ note }, req, res);
  } catch (err) {
    return next(err);
  }
};

const enableOne = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const id = await getId.validate(noteId);
    const note = await noteService.enableOne({
      account_id: req.account.id,
      id,
    });
    return successUtils.handler({ note }, req, res);
  } catch (err) {
    return next(err);
  }
};

const disableOne = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const id = await getId.validate(noteId);
    const note = await noteService.disableOne({
      account_id: req.account.id,
      id,
    });
    return successUtils.handler({ note }, req, res);
  } catch (err) {
    return next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const id = await getId.validate(noteId);
    const note = await noteService.deleteOne({
      account_id: req.account.id,
      id,
    });
    return successUtils.handler({ note }, req, res);
  } catch (err) {
    return next(err);
  }
};

const suggestCopyName = async (req, res, next) => {
  const { name } = req.params;
  try {
    const newName = await noteService.suggestCopyName({
      name,
      account_id: req.account.id,
    });
    return successUtils.handler({ name: newName }, req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getListCount,
  getList,
  getOne,
  addOne,
  updateOne,
  enableOne,
  disableOne,
  deleteOne,
  getConfig,
  suggestCopyName,
};
