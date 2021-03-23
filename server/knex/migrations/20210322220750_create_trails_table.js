exports.up = function(knex, Promise) {
    return knex.schema.createTable('trails', table => {
      table.increments();
      table.string('district');
      table.decimal('length_m');
      table.integer('elev_range');
      table.string('climat');
      table.string('tspt_type');
      table.string('feature');
      table.string('amenitie');
      table.string('use_rest');
      table.string('hazard');
      table.string('trailname');
      table.string('trail_url');
      table.json('coordinates');
      table.string('trail_num');
      table.string('rain');
      table.string('weather');
      table.string('region');
      table.string('standard')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('trails');
  };
  