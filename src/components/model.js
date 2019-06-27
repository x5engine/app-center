import { Model, User } from 'radiks'

class ModelExt extends Model {
  savePrivately() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.beforeSave) {
          await this.beforeSave()
        }
        const now = new Date().getTime()
        this.attrs.createdAt = this.attrs.createdAt || now
        this.attrs.updatedAt = now
        await this.sign()
        const encrypted = await this.encrypted()
        await this.saveFile(encrypted)
        resolve(this)
      } catch (error) {
        reject(error)
      }
    })
  }
}
export class UserComment extends ModelExt {
  static className = 'UserComment'
  static schema = {
    object: {
      type: String,
      decrypted: true,
    },
    comment: String,
    createdBy: {
      type: String,
      decrypted: true,
    },
  }
  
}

export class OwnerComment extends ModelExt {
  static className = 'OwnerComment'
  static schema = {
    object: {
      type: String,
      decrypted: true,
    },
    comment: String,
    createdBy: {
      type: String,
      decrypted: true,
    },
    verified: Boolean,
  }
  static defaults = {
    verified: false,
  }
}
