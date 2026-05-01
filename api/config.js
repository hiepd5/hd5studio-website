const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { data, error } = await supabase
    .from('site_config')
    .select('key, value')

  if (error) {
    return res.status(500).json({ error: 'Failed to load config' })
  }

  const config = Object.fromEntries(data.map(r => [r.key, r.value]))

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json(config)
}
