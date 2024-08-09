export interface colI {
  id: string;
  name: string;
}

export const constants = {
  nature: 'Nature',
  amount: 'Prix',
  comment: 'Commentaire',
  purchasedOn: 'Date de la dépense',
  distance: 'Distance',
  invite: `Nombre d'invité`,
  send: 'Envoyer',
  titleExpenseList: 'La liste de vos dépenses',
  addExpense: 'Ajouter une dépense',
  editExpense: 'Modifier une dépense',
  fillFormRequired: 'Veuillez remplir les champs obligatoires (*)',
  fiedError: 'Le champs est incorrect',
  filedRequired: 'Le champ est obligatoire',
};

export const headerContant: colI[] = [
  {
    id: 'nature',
    name: constants.nature,
  },
  {
    id: 'amount',
    name: constants.amount,
  },
  {
    id: 'comment',
    name: constants.comment,
  },
  {
    id: 'purchasedOn',
    name: constants.purchasedOn,
  },
  {
    id: 'updatedAt',
    name: 'Date de mise à jour',
  },
  {
    id: 'distance',
    name: constants.distance,
  },
  {
    id: 'invites',
    name: constants.invite,
  },
];

export const updatedAtColumn = 'updatedAt';

export const paginationConstant = {
  previous: 'Précédent',
  next: 'Suivant',
  firstPage: 'Première page',
  lastPage: 'Dernière page',
  ariaLabel: 'Page de navigation pour le tableau',
};

export const tripConstant = 'trip';

export const natureContant = [
  {
    code: tripConstant,
    label: 'Déplacement',
  },
  {
    code: 'restaurant',
    label: 'Restaurant',
  },
];

export const errorConstant = `Une erreur s'est produite, Veuillez réessayer`;
