const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // DEBUG — xóa sau khi fix
  if (req.url.includes('debug')) {
    return res.status(200).json({
      SUPABASE_URL: process.env.SUPABASE_URL || 'NOT SET',
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'SET (' + process.env.SUPABASE_SERVICE_KEY.substring(0, 10) + '...)' : 'NOT SET'
    })
  }

  const { data, error } = await supabase
    .from('portfolio')
    .select('id, sort_order, featured, slug, title, category, year, tags, thumb_url, full_urls, video_id')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    return res.status(500).json({ error: 'Failed to load portfolio' })
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json(data)
}
