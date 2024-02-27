/**
 * @swagger
 * tags:
 *   name: Card
 *   description: Card managing API
 * /Card:
 *   get:
 *     summary: Lists all the cards
 *     tags: [Card]
 *     responses:
 *       200:
 *         description: The list of the cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/card'
 */
