import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({response}: HttpContextContract) {
    const post = await Post.all()

    return response.status(200).json({ code : 200, status : 'success', data : post})
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const input = request.only(['title','konten'])

    try {
      const posts = await Post.create(input)

      return response.status(200).json({ code : 200, status : 'success', data : posts})
    } catch (error) {

      return response.status(500).json({ code : 500, status : 'error', message : error.message})
    }

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const input = request.only(['title','konten'])

    try {
      const post = await Post.findByOrFail('id',params.id)
      post?.merge(input)

      await post?.save()

      return response.status(200).json({code : 200, status : 'success', data : post})
    } catch (error) {
      return response.status(500).json({code : 500, status: 'error', message : error.message})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try {
      const post = await Post.findByOrFail('id', params.id)
      post?.delete()

      return response.status(200).json({code : 200, status : 'deleted', data : post})
    } catch (error) {
      return response.status(500).json({code : 500, status : 'error', message : error.message})
    }
  }
}
